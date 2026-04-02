import { selectOption } from "@/types/globalTypes";

type getOptionParams = {
  optionIDs: string[];
  currentIndex: number;
  steps?: number;
};

export function getNextOption({
  optionIDs,
  currentIndex,
  steps = 1,
  observer,
}: getOptionParams & { observer?: HTMLElement | null }): selectOption {
  if (currentIndex + steps <= optionIDs.length - 1) {
    const nextID = optionIDs.at(currentIndex + steps);
    if (nextID) return { id: nextID, index: currentIndex + steps };
  } else if (currentIndex < optionIDs.length - 1) {
    const last = optionIDs.at(-1);
    if (last) return { id: last, index: optionIDs.length - 1 };
  } else if (observer) {
    optionIntoView(observer);
    return null;
  } else {
    const first = optionIDs.at(0);
    if (first) return { id: first, index: 0 };
  }
  return null;
}

export function getPreviousOption({
  optionIDs,
  currentIndex,
  steps = 1,
}: getOptionParams): selectOption {
  if (currentIndex - steps >= 0) {
    const previousID = optionIDs.at(currentIndex - steps);

    if (previousID) return { id: previousID, index: currentIndex - steps };
  } else if (currentIndex >= 0) {
    const first = optionIDs.at(0);
    if (first) return { id: first, index: 0 };
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
