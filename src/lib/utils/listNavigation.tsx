import { selectOption } from "@/types/globalTypes";

export function getNextOption(
  optionIDs: string[],
  currentIndex: number,
  observer?: HTMLElement | null,
): selectOption {
  if (currentIndex < optionIDs.length - 1) {
    const nextID = optionIDs.at(currentIndex + 1);
    if (nextID) {
      return { id: nextID, index: currentIndex + 1 };
    }
  } else if (observer) {
    optionIntoView(observer);
    return null;
  } else {
    const first = optionIDs.at(0);
    if (first) return { id: first, index: 0 };
  }
  return null;
}

export function getPreviousOption(
  optionIDs: string[],
  currentIndex: number,
  observer?: HTMLElement | null,
): selectOption {
  if (currentIndex > 0 && currentIndex < optionIDs.length) {
    const previousID = optionIDs.at(currentIndex - 1);

    if (previousID) {
      return { id: previousID, index: currentIndex - 1 };
    }
  } else if (!observer) {
    const last = optionIDs.at(optionIDs.length - 1);
    if (last) return { id: last, index: optionIDs.length - 1 };
  }
  return null;
}

export function optionIntoView(element: Element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest",
  });
}
