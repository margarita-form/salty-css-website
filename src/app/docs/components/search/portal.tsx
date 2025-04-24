"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Portal is only rendered on the client-side
  if (!mounted) return null;

  return createPortal(children, document.body);
};
