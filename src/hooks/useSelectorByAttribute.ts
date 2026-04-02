import { RefObject, useEffect, useState } from "react";

import { useItemMap } from "@/hooks/useItemMap";

export function useSelectorByAttribute(rootRef: RefObject<HTMLDivElement>) {
  const [container, setContainer] = useState<HTMLUListElement | null>(null);
  const { getMap } = useItemMap();

  useEffect(() => {
    if (!rootRef.current) return;

    const node = rootRef.current.querySelector<HTMLUListElement>(
      "[data-scroll-container]",
    );

    if (node) setContainer(node);

    const liItems =
      rootRef.current.querySelectorAll<HTMLLIElement>("[data-item-id]");

    liItems.forEach((node) => {
      const id = node.dataset.itemId;
      if (id) getMap().set(id, node);
    });
  }, [getMap, rootRef]);

  return { container, getMap };
}
