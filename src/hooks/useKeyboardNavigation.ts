import { useCallback } from "react";

import { getNextOption, getPreviousOption } from "@/lib/utils/listNavigation";
import { selectOption } from "@/types/globalTypes";

type UseKeyboardNavigationParams = {
  optionIDs: string[] | null;
  observer?: React.RefObject<HTMLDivElement>;
  selected: selectOption;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onEnter?: (id: string) => void;
  onToggleSelect(option: selectOption): void;
};

export function useKeyboardNavigation({
  optionIDs,
  observer,
  selected,
  isExpanded,
  onToggleExpand,
  onEnter,
  onToggleSelect,
}: UseKeyboardNavigationParams) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>) => {
      let option: selectOption = null;
      switch (event.key) {
        case "Up":
        case "ArrowUp":
          if (!optionIDs) break;
          event.preventDefault();
          option = getPreviousOption(
            optionIDs,
            selected ? selected.index : 0,
            observer && observer.current,
          );
          break;
        case "Down":
        case "ArrowDown":
          if (!optionIDs) break;
          event.preventDefault();
          option = getNextOption(
            optionIDs,
            selected ? selected.index : -1,
            observer && observer.current,
          );
          break;
        case "Escape":
        case "Tab":
          if (isExpanded && onToggleExpand !== undefined) {
            onToggleExpand();
          }
          break;
        case "Enter":
          if (selected && onEnter !== undefined) {
            onEnter(selected.id);
          }
          break;
        default:
          if (!isExpanded && onToggleExpand !== undefined) {
            onToggleExpand();
          }
          break;
      }
      if (option) onToggleSelect(option);
    },
    [
      onEnter,
      onToggleExpand,
      onToggleSelect,
      isExpanded,
      observer,
      optionIDs,
      selected,
    ],
  );

  return { handleKeyDown };
}
