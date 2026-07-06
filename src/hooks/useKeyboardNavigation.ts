import { useCallback } from "react";
import type { KeyboardEvent } from "react";

type KeyboardNavigationOptions = {
  orientation?: "horizontal" | "vertical" | "both";
  loop?: boolean;
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[role='button']:not([aria-disabled='true'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute("hidden") && element.offsetParent !== null,
  );

export const useKeyboardNavigation = ({
  orientation = "both",
  loop = true,
}: KeyboardNavigationOptions = {}) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const isNext = event.key === "ArrowDown" || event.key === "ArrowRight";
      const isPrevious = event.key === "ArrowUp" || event.key === "ArrowLeft";

      const verticalKey = event.key === "ArrowDown" || event.key === "ArrowUp";
      const horizontalKey = event.key === "ArrowRight" || event.key === "ArrowLeft";

      if (!isNext && !isPrevious) return;
      if (orientation === "vertical" && horizontalKey) return;
      if (orientation === "horizontal" && verticalKey) return;

      const container = event.currentTarget;
      const focusable = getFocusableElements(container);
      if (!focusable.length) return;

      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      if (currentIndex === -1 && event.key.startsWith("Arrow")) return;

      event.preventDefault();

      const offset = isNext ? 1 : -1;
      const nextIndex = currentIndex + offset;
      const targetIndex = loop
        ? (nextIndex + focusable.length) % focusable.length
        : Math.max(0, Math.min(nextIndex, focusable.length - 1));

      focusable[targetIndex]?.focus();
    },
    [loop, orientation],
  );

  return { onKeyDown };
};
