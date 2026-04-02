import { RefObject, useEffect } from "react";

type nodeParams = {
  targetNode: HTMLElement | null;
  targetRef?: never;
};
type refParams = {
  targetRef: RefObject<HTMLElement>;
  targetNode?: never;
};

type UseIntersectionObserverParams = {
  enabled?: boolean;
  onIntersect: () => void;
  outIntersect?: () => void;
  threshold?: number | number[];
} & (nodeParams | refParams);

export function useIntersectionObserver({
  enabled = true,
  onIntersect,
  outIntersect,
  threshold = 0.5,
  targetNode,
  targetRef,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    const target = targetRef?.current || targetNode;

    if (!target || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          } else if (outIntersect !== undefined) {
            outIntersect();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px -16px 0px -16px",
        threshold: threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, onIntersect, outIntersect, threshold, enabled, targetNode]);
}
