import { useLayoutEffect, useRef } from "react";

type Params = {
  minSize: number;
  type: "row" | "column";
  enable?: boolean;
};

function calcVisibleLines({
  minSize,
  type,
  container,
}: Params & { container: HTMLElement }) {
  const styles = window.getComputedStyle(container);
  let containerSize: number;
  let padding: number;
  if (type === "row") {
    containerSize = container.clientHeight;
    padding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
  } else {
    containerSize = container.clientWidth;
    padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
  }
  return Math.floor((containerSize - padding) / minSize);
}

export function useDynamicGrid({
  ref,
  minSize,
  type,
  cssVariable,
  enable = true,
}: Params & { cssVariable: string; ref: React.RefObject<HTMLElement> }) {
  const last = useRef<number>(0);

  useLayoutEffect(() => {
    if (!enable) return;
    const el = ref.current;
    if (!el) return;

    function update() {
      if (!el) return;

      const visibleLines = calcVisibleLines({
        container: el,
        minSize,
        type,
      });
      if (last.current !== visibleLines) {
        last.current = visibleLines;
        el.style.setProperty(cssVariable, String(visibleLines));
      }
    }

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, minSize, type, cssVariable, enable]);
}
