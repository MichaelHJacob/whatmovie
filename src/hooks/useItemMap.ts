import { useRef } from "react";

export function useItemMap() {
  const itemsRef = useRef<Map<string, HTMLLIElement> | null>(null);

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  const setItemRef = (id: string) => (node: HTMLLIElement) => {
    const map = getMap();
    if (node) {
      map.set(id, node);
    } else {
      map.delete(id);
    }
  };

  return { getMap, setItemRef };
}
