import { useEffect } from "react";

type UseIntersectionObserverProps = {
  enabled?: boolean;
  targetRef: React.RefObject<Element> | null;
  onIntersect: () => void;
};

export default function useIntersectionObserver({
  enabled = true,
  targetRef,
  onIntersect,
}: UseIntersectionObserverProps) {
  useEffect(() => {
    if (!enabled || !targetRef?.current) return;

    const target = targetRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [enabled, targetRef, onIntersect]);
}
