import { RefObject, useEffect, useRef } from "react";

import { useItemMap } from "@/hooks/useItemMap";

export function useSelectorByAttribute(rootRef: RefObject<HTMLDivElement>) {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const { getMap } = useItemMap();

  useEffect(() => {
    if (rootRef.current) {
      containerRef.current = rootRef.current.querySelector<HTMLUListElement>(
        "[data-scroll-container]",
      );

      const liItems =
        rootRef.current.querySelectorAll<HTMLLIElement>("[data-item-id]");

      liItems.forEach((node) => {
        const id = node.dataset.itemId;
        if (id) getMap().set(id, node);
      });
    }
  }, [getMap, rootRef]);

  return { containerRef, getMap };
}
