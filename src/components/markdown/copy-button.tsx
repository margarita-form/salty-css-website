"use client";
import React, { useState } from "react";
import { StyledCopyButton } from "./markdown.css";
import { Icon } from "../icon/icon.css";

interface CopyButtonProps {
  textToCopy: string;
}

export const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const src = copied ? "url(/icons/check-circle.svg)" : "url(/icons/copy.svg)";
  const color = copied ? "var(--colors-success)" : "inherit";
  const text = copied ? "Copied!" : "Copy to clipboard";
  return (
    <StyledCopyButton onClick={handleCopy} title={text} aria-label={text}>
      <Icon css-src={src} style={{ color }} />
    </StyledCopyButton>
  );
};
