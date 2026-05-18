"use client";

import { useId, useRef, useState } from "react";
import { useFramework } from "@/app/docs/components/framework-context";
import { getFramework } from "@/lib/frameworks";
import { Icon } from "../icon/icon.css";
import {
  FrameworkSwitcherTrigger,
  FrameworkTriggerChevron,
  FrameworkTriggerIcon,
} from "./framework-switcher.css";
import { FrameworkSwitcherModal } from "./framework-switcher-modal";

export const FrameworkSwitcher = () => {
  const { framework } = useFramework();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalId = useId();
  const titleId = useId();

  const current = getFramework(framework);

  return (
    <>
      <FrameworkSwitcherTrigger
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={modalId}
        aria-label={`Change framework, current: ${current.label}`}
        onClick={() => setIsOpen((v) => !v)}
      >
        <FrameworkTriggerIcon src={current.icon} alt="" />
        <span>{current.label}</span>
        <FrameworkTriggerChevron>
          <Icon css-src="url(/icons/chevron-down.svg)" />
        </FrameworkTriggerChevron>
      </FrameworkSwitcherTrigger>

      <FrameworkSwitcherModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        titleId={titleId}
        modalId={modalId}
      />
    </>
  );
};
