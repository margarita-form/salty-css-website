"use client";

import { useEffect, useRef } from "react";
import { Portal } from "@/app/docs/components/search/portal";
import { useFramework } from "@/app/docs/components/framework-context";
import { FRAMEWORKS, type FrameworkId } from "@/lib/frameworks";
import { Icon } from "../icon/icon.css";
import {
  ModalBackdrop,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  OptionButton,
  OptionIcon,
  OptionList,
} from "./framework-switcher-modal.css";

interface FrameworkSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  titleId: string;
  modalId: string;
}

export const FrameworkSwitcherModal = ({
  isOpen,
  onClose,
  triggerRef,
  titleId,
  modalId,
}: FrameworkSwitcherModalProps) => {
  const { framework, setFramework } = useFramework();
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<FrameworkId, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!isOpen) return;
    const active = optionRefs.current.get(framework);
    active?.focus();
  }, [isOpen, framework]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const order = FRAMEWORKS.map((f) => f.id);
        const currentEl = document.activeElement as HTMLElement | null;
        const currentId = order.find(
          (id) => optionRefs.current.get(id) === currentEl,
        );
        const startIdx = currentId ? order.indexOf(currentId) : 0;
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const nextIdx = (startIdx + delta + order.length) % order.length;
        optionRefs.current.get(order[nextIdx])?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) return;
    triggerRef.current?.focus();
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const handleSelect = (id: FrameworkId) => {
    setFramework(id);
    onClose();
  };

  return (
    <Portal>
      <ModalBackdrop onClick={onClose} />
      <ModalContainer
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        id={modalId}
      >
        <ModalHeader>
          <ModalTitle id={titleId}>Choose a framework</ModalTitle>
          <ModalCloseButton
            type="button"
            aria-label="Close framework switcher"
            onClick={onClose}
          >
            <Icon css-src="url(/icons/close-x.svg)" />
          </ModalCloseButton>
        </ModalHeader>

        <OptionList role="radiogroup" aria-labelledby={titleId}>
          {FRAMEWORKS.map((f) => (
            <OptionButton
              key={f.id}
              type="button"
              role="radio"
              aria-checked={f.id === framework}
              ref={(el) => {
                if (el) optionRefs.current.set(f.id, el);
                else optionRefs.current.delete(f.id);
              }}
              onClick={() => handleSelect(f.id)}
            >
              <OptionIcon src={f.icon} alt="" />
              <span>{f.label}</span>
            </OptionButton>
          ))}
        </OptionList>
      </ModalContainer>
    </Portal>
  );
};
