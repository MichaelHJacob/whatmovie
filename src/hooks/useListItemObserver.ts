import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

import { selectOption } from "@/types/globalTypes";

type UseIntersectionObserverParams = {
  rootElement: RefObject<HTMLElement>;
  margin: string;
  optionRefs: MutableRefObject<Map<
    string,
    { el: Element; index: number }
  > | null>;
};

export function useListItemObserver({
  rootElement,
  margin,
  optionRefs,
}: UseIntersectionObserverParams): NonNullable<selectOption>[] {
  const [selected, setSelected] = useState<NonNullable<selectOption>[]>([]);

  const callback: IntersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      setSelected((prev) => {
        const newSelection = new Set(prev);

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element instanceof HTMLElement) {
              const elementId = element.dataset.movieId ?? "";
              const option = optionRefs.current?.get(elementId) ?? null;

              if (option)
                newSelection.add({ id: elementId, index: option.index });
            }
          } else {
            const element = entry.target;
            if (element instanceof HTMLElement) {
              const elementId = element.dataset.movieId ?? "";
              const { index } = optionRefs.current?.get(elementId) ?? {};

              newSelection.forEach((objSelect) => {
                if (index === objSelect.index) {
                  newSelection.delete(objSelect);
                }
              });
            }
          }
        });

        return Array.from(newSelection);
      });
    },
    [optionRefs],
  );

  useEffect(() => {
    if (!optionRefs.current) return;

    const observer = new IntersectionObserver(callback, {
      root: rootElement.current,
      rootMargin: margin,
      threshold: 0.1,
    });

    optionRefs.current.values().forEach(({ el }) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [callback, optionRefs, rootElement, margin]);

  return selected;
}
