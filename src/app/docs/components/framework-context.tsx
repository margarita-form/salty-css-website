"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_FRAMEWORK,
  isFrameworkId,
  type FrameworkId,
} from "@/lib/frameworks";
import { FrameworkScope } from "./framework-context.css";

interface FrameworkContextValue {
  framework: FrameworkId;
  setFramework: (id: FrameworkId) => void;
}

const FrameworkContext = createContext<FrameworkContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "salty-css:framework";

export const useFramework = () => {
  const ctx = useContext(FrameworkContext);
  if (!ctx) {
    throw new Error("useFramework must be used within a FrameworkProvider");
  }
  return ctx;
};

const readUrlFramework = (pathname: string | null): FrameworkId | null => {
  if (!pathname) return null;
  const segments = pathname.split("/");
  if (segments[1] !== "docs") return null;
  const candidate = segments[2];
  return isFrameworkId(candidate) ? candidate : null;
};

const swapFrameworkInPath = (
  pathname: string,
  framework: FrameworkId,
): string => {
  const segments = pathname.split("/");
  if (segments[1] !== "docs") return pathname;
  if (segments.length < 3) return pathname;
  if (isFrameworkId(segments[2])) {
    segments[2] = framework;
  } else {
    segments.splice(2, 0, framework);
  }
  return segments.join("/");
};

interface FrameworkProviderProps {
  children: ReactNode;
}

export const FrameworkProvider = ({ children }: FrameworkProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const urlFramework = useMemo(
    () => readUrlFramework(pathname) ?? DEFAULT_FRAMEWORK,
    [pathname],
  );

  const [framework, setFrameworkState] = useState<FrameworkId>(urlFramework);

  useEffect(() => {
    setFrameworkState(urlFramework);
  }, [urlFramework]);

  useEffect(() => {
    const _urlFramework = readUrlFramework(pathname);
    if (_urlFramework) {
      if (_urlFramework) return;
      setFrameworkState(_urlFramework);
      return;
    }
    if (typeof window === "undefined") return;
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }

    // Set framework from localStorage if URL doesn't have a valid framework
    if (saved && isFrameworkId(saved)) {
      setFrameworkState(saved);
    }
  }, [pathname]);

  const setFramework = useCallback(
    (id: FrameworkId) => {
      setFrameworkState(id);
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(STORAGE_KEY, id);
        } catch {
          /* ignore */
        }
      }
      if (pathname && isFrameworkId(pathname.split("/")[2] ?? "")) {
        const next = swapFrameworkInPath(pathname, id);
        if (next !== pathname) router.replace(next, { scroll: false });
      }
    },
    [pathname, router],
  );

  const value = useMemo(
    () => ({ framework, setFramework }),
    [framework, setFramework],
  );

  return (
    <FrameworkContext.Provider value={value}>
      <FrameworkScope data-active-framework={framework}>
        {children}
      </FrameworkScope>
    </FrameworkContext.Provider>
  );
};
