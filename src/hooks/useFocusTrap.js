import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Trap keyboard focus inside a dialog while it is open.
 *
 * - Moves focus to the first focusable element (or the container itself).
 * - Cycles Tab / Shift+Tab inside the container.
 * - Calls `onClose` on Escape.
 * - Restores focus to `returnFocusRef` (or whatever was focused before) on close.
 *
 * @param {{ current: HTMLElement | null }} containerRef
 * @param {boolean} active
 * @param {{ onClose?: () => void, returnFocusRef?: { current: HTMLElement | null } }} [options]
 */
export function useFocusTrap(containerRef, active, options = {}) {
  const { onClose, returnFocusRef } = options;
  const onCloseRef = useRef(onClose);
  const returnFocusRefLatest = useRef(returnFocusRef);

  onCloseRef.current = onClose;
  returnFocusRefLatest.current = returnFocusRef;

  useEffect(() => {
    if (!active) return undefined;
    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );

    const initial = getFocusable()[0];
    (initial || container).focus({ preventScroll: true });

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === first || activeElement === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const target = returnFocusRefLatest.current?.current || previouslyFocused;
      if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
    };
  }, [active, containerRef]);
}
