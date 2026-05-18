// Lightweight templating engine for docs markdown.
//
// Supports:
//   {{name}}                 -> variables[name]
//   {{name || "fallback"}}   -> variables[name] when set, else fallback
//   {{snippet:foo}}          -> loadSnippet("foo")
//   {{snippet:dir/foo}}      -> loadSnippet("dir/foo")
//   {{fw-snippet:topic}}     -> loadSnippet(`topic/${variables.frameworkId}`),
//                               falling back to `topic/_${variables.frameworkFamily}`
//                               when the framework-specific file is missing.
//
// The engine is isomorphic: the snippet loader is injected so the same
// renderer is reusable from Next runtime (webpack-import-based loader)
// and the Node build script (fs.readFile-based loader).
//
// If we later adopt @bou-co/parsing this module can be swapped out
// while keeping the renderTemplate / docsParser signatures stable.

export type SnippetLoader = (path: string) => Promise<string>;

export interface RenderOptions {
  variables: Record<string, unknown>;
  loadSnippet: SnippetLoader;
}

const TOKEN = /\{\{\s*([^{}]+?)\s*\}\}/g;

const resolveVariable = (
  expression: string,
  variables: Record<string, unknown>,
): string => {
  const [rawName, ...fallbackParts] = expression.split("||");
  const name = rawName.trim();
  const value = variables[name];
  if (value !== undefined && value !== null && value !== "") {
    return String(value);
  }
  if (fallbackParts.length > 0) {
    const fallback = fallbackParts.join("||").trim();
    return fallback.replace(/^["']|["']$/g, "");
  }
  return "";
};

export const renderTemplate = async (
  body: string,
  { variables, loadSnippet }: RenderOptions,
  maxPasses = 4,
): Promise<string> => {
  let current = body;
  for (let pass = 0; pass < maxPasses; pass += 1) {
    const matches = Array.from(current.matchAll(TOKEN));
    if (matches.length === 0) return current;

    const replacements = await Promise.all(
      matches.map(async (match) => {
        const expression = match[1].trim();
        if (expression.startsWith("snippet:")) {
          const path = expression.slice("snippet:".length).trim();
          return loadSnippet(path);
        }
        if (expression.startsWith("fw-snippet:")) {
          const topic = expression.slice("fw-snippet:".length).trim();
          const fw = variables.frameworkId;
          if (!fw) return "";
          const direct = await loadSnippet(`${topic}/${fw}`);
          if (direct) return direct;
          const family = variables.frameworkFamily;
          if (!family) return "";
          return loadSnippet(`${topic}/_${family}`);
        }
        return resolveVariable(expression, variables);
      }),
    );

    let next = "";
    let cursor = 0;
    matches.forEach((match, idx) => {
      const start = match.index ?? 0;
      next += current.slice(cursor, start);
      next += replacements[idx];
      cursor = start + match[0].length;
    });
    next += current.slice(cursor);

    if (next === current) return current;
    current = next;
  }
  return current;
};

// Convenience wrapper that mirrors the parsing-config style intended by
// the original plan: docsParser({ body }, { variables }) -> { body }.
export const docsParser = async (
  input: { body: string },
  options: { variables: Record<string, unknown>; loadSnippet: SnippetLoader },
): Promise<{ body: string }> => {
  const rendered = await renderTemplate(input.body, {
    variables: options.variables,
    loadSnippet: options.loadSnippet,
  });
  return { body: rendered };
};
