---
title: CLI
description: Use the salty-css command-line interface to scaffold, generate, and build your project.
topic: CLI
category: tutorial
schemaType: TechArticle
keywords: [cli, commands, init, generate, build, up]
intent: Drive Salty CSS from the command line with the init, generate, build, and up commands.
proficiencyLevel: Beginner
priority: 0.7
---

# Salty CSS CLI

Salty CSS comes with a powerful command-line interface (CLI) that helps you initialize projects, generate components, update packages, and build files.

## Installation

The Salty CSS CLI is bundled with the core package. You can use it with npx without installing it globally:

```bash
npx salty-css [command]
```

## Available Commands

### Initialize a Project

```bash
npx salty-css init [directory]
```

This command:

- Installs required packages
- Detects the framework in use (Next.js, Vite, Astro, etc.)
- Creates necessary config files
- Sets up the project structure

Options:

- `directory`: The target directory for initialization (defaults to current directory)

Example:

```bash
npx salty-css init
```

**Generated artefacts.** After init you should find:

- `salty.config.ts` next to your bundler config (`next.config.ts`, `vite.config.ts`, etc.).
- The Salty packages added to `package.json` and installed.
- The build plugin wired into your bundler config (e.g. `withSaltyCss(nextConfig)`).
- An empty `saltygen/` directory (populated on first run).

**Wrong framework picked up?** `init` reads your `package.json` to decide which framework helpers to install. If you're in a monorepo, run it from the package's own root, not the workspace root. If it already wrote the wrong config, delete `salty.config.ts` and re-run — the safe path is always a clean re-init rather than hand-editing the generated files.

### Generate Components

```bash
npx salty-css generate [filePath]
```

This command creates a new Salty CSS component file with boilerplate code.

Options:

- `filePath`: Path where the component should be created (e.g., `src/components/button`)
- `--className`: Custom class name for the component
- `--name`: Custom component name (defaults to filename)

Example:

```bash
npx salty-css generate src/components/card --name Card
```

### Build Files

```bash
npx salty-css build [directory]
```

This command compiles Salty CSS files in your project. It's usually not needed if you're using Next.js, Vite, or Astro with the proper plugin, but it can be useful for debugging or advanced scenarios.

Options:

- `directory`: The target directory to build (defaults to current directory)

Example:

```bash
npx salty-css build src
```

**Generated artefacts.** A successful build produces, inside `saltygen/`:

- `index.css` — the single bundled stylesheet imported at runtime (with `importStrategy: 'root'`) or referenced per-component (with `importStrategy: 'component'`).
- `salty.config.js` — a compiled snapshot of your `salty.config.ts` used internally by the runtime.
- Per-component `.css` files — only when `importStrategy: 'component'` is set.

`saltygen/` is regenerated from scratch on every build, so it's safe (and recommended) to add it to `.gitignore`.

### Update Packages

```bash
npx salty-css up [version]
```

This command updates all Salty CSS packages in your project to the specified version.

Options:

- `version`: Version to update to (defaults to "latest")

Example:

```bash
npx salty-css up
```
