import { useEffect } from "react";

import { useItemMap } from "@/hooks/useItemMap";
import { optionIntoView } from "@/lib/utils/listNavigation";

export function useAutoScrollRef(
  id: string,
  isSelected: boolean,
  enable: boolean = true,
) {
  const { getMap, setItemRef } = useItemMap();

  useEffect(() => {
    if (isSelected && enable) {
      const node = getMap().get(id);
      if (node) optionIntoView(node);
    }
  }, [enable, getMap, id, isSelected]);

  return setItemRef(id);
}
