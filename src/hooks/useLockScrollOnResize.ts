import { RefObject, useEffect, useRef } from "react";

export function useLockScrollOnResize(containerRef: RefObject<HTMLElement>) {
  const resizing = useRef<boolean>(false);
  const returnTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      if (!resizing.current) {
        resizing.current = true;
        container.style.overflowX = "hidden";
      }

      clearTimeout(returnTimeout.current);
      returnTimeout.current = setTimeout(() => {
        resizing.current = false;
        container.style.overflowX = "auto";
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);
}
