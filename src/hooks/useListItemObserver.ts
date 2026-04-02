import { useCallback, useEffect, useMemo, useState } from "react";

import { selectOption } from "@/types/globalTypes";

type UseIntersectionObserverParams = {
  containerNode: HTMLElement | null;
  margin: IntersectionObserverInit["rootMargin"];
  optionIDs: string[];
  optionMap: Map<string, HTMLLIElement>;
  threshold: IntersectionObserverInit["threshold"];
};

export function useListItemObserver({
  containerNode,
  optionIDs,
  margin,
  optionMap,
  threshold,
}: UseIntersectionObserverParams): NonNullable<selectOption>[] {
  const [inView, setInView] = useState<NonNullable<selectOption>[]>([]);
  const selectionMap = useMemo(() => {
    return new Map<HTMLElement, NonNullable<selectOption>>();
  }, []);

  const callback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const elementId = element.dataset.itemId;

        if (!elementId) return;
        const index = optionIDs.indexOf(elementId);
        if (entry.isIntersecting) {
          selectionMap.set(element, { id: elementId, index: index });
        } else {
          selectionMap.delete(element);
        }
      });

      setInView(Array.from(selectionMap.values()));
    },
    [selectionMap, optionIDs],
  );

  useEffect(() => {
    if (!containerNode) return;

    const intersectionObserver = new IntersectionObserver(callback, {
      root: containerNode,
      rootMargin: margin,
      threshold: threshold,
    });

    optionMap.forEach((node) => {
      intersectionObserver.observe(node);
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [callback, optionIDs, margin, optionMap, containerNode, threshold]);

  const viewInOrder = useMemo(() => {
    return inView.sort((a, b) => a.index - b.index);
  }, [inView]);

  return viewInOrder;
}
