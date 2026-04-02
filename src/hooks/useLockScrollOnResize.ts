import { RefObject, useEffect, useRef } from "react";

export function useLockScrollOnResize(
  container: HTMLElement | null | RefObject<HTMLElement>,
) {
  const resizing = useRef<boolean>(false);
  const returnTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const element =
      container && "current" in container ? container.current : container;

    if (!element) return;

    const handleResize = () => {
      if (!resizing.current) {
        resizing.current = true;
        element.style.overflowX = "hidden";
      }

      clearTimeout(returnTimeout.current);
      returnTimeout.current = setTimeout(() => {
        resizing.current = false;
        element.style.overflowX = "auto";
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [container]);
}
