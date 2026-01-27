import { useEffect } from "react";

type UseIntersectionObserverParams = {
  enabled?: boolean;
  targetRef: React.RefObject<Element> | null;
  onIntersect: () => void;
  outIntersect?: () => void;
  threshold?: number | number[];
};

export function useIntersectionObserver({
  enabled = true,
  targetRef,
  onIntersect,
  outIntersect,
  threshold = 0,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    if (!enabled || !targetRef?.current) return;

    const target = targetRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        } else {
          if (outIntersect) outIntersect();
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [enabled, targetRef, onIntersect, outIntersect, threshold]);
}
