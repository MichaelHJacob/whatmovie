import { useCallback, useEffect, useRef, useState } from "react";

import PauseToIcon from "@/assets/icons/pauseIcon.svg";
import PlayToIcon from "@/assets/icons/playIcon.svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getNextOption, optionIntoView } from "@/lib/utils/listNavigation";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const autoScrollStyles = tv({
  slots: {
    container:
      "group relative box-content justify-self-end overflow-hidden rounded-3xl shadow-black/20 transition-all duration-500 lg:hover:shadow-sm lg:hover:backdrop-blur-md lg:hover:backdrop-saturate-200",
    numbers:
      "relative box-content block h-8 w-8 rounded-md transition-all duration-500 before:absolute before:right-1/2 before:top-1/2 before:block before:h-4 before:w-4 before:-translate-y-1/2 before:translate-x-1/2 before:rounded-md before:content-[''] group-hover:animate-none",
    icon: "box-content h-3 w-3 stroke-none p-[0.625rem] transition-all duration-500",
    textNumber:
      "box-content block w-3 px-[0.625rem] text-center font-sans text-sm font-bold leading-8",
  },
  variants: {
    model: {
      cards: {
        container: "lg:hover:bg-navigationBtn-hover",
        numbers: "before:bg-navigationBtn",
        icon: "fill-navigationIcon",
        textNumber: "text-base-subtle",
      },
      banner: {
        container: "lg:hover:bg-navigationBtn-black-hover",
        numbers: "before:bg-navigationBtn-black",
        icon: "fill-navigationIcon-black",
        textNumber: "text-white-subtle",
      },
    },
  },
});

type AutoScrollerVariants = VariantProps<typeof autoScrollStyles>;

type AutoScrollerProps = AutoScrollerVariants & {
  optionMap: Map<string, HTMLElement>;
  containerNode: HTMLElement | null;
  optionsIDs: string[];
  selected: selectOption;
};

export default function AutoScroller({
  optionMap,
  containerNode,
  optionsIDs,
  selected,
  model = "banner",
}: Readonly<AutoScrollerProps>) {
  const { container, numbers, icon, textNumber } = autoScrollStyles({ model });

  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);
  const isAutoScrolling = useRef<boolean>(true);
  const interval = useRef<NodeJS.Timeout>();

  const onAutoScroll = useCallback(() => {
    setAuto(true);
  }, []);

  const outAutoScroll = useCallback(() => {
    setCount(0);
    clearInterval(interval.current);
    setAuto(false);
  }, []);

  useIntersectionObserver({
    targetNode: containerNode,
    onIntersect: onAutoScroll,
    outIntersect: outAutoScroll,
    threshold: 0.9,
  });

  useEffect(() => {
    const first = selected;

    function step() {
      if (!first) return;
      setCount((c) => c + 1);

      if (count >= 3) {
        setCount(0);
        const next = getNextOption({
          optionIDs: optionsIDs,
          currentIndex: first.index,
        });
        if (next) {
          const element = optionMap.get(next.id);
          isAutoScrolling.current = true;
          if (element) optionIntoView(element);
        } else {
          outAutoScroll();
        }
      }
    }

    if (auto) interval.current = setInterval(step, 1000);

    return () => clearInterval(interval.current);
  }, [auto, count, optionsIDs, optionMap, selected, outAutoScroll]);

  useEffect(() => {
    if (!selected) return;
    if (isAutoScrolling.current) {
      isAutoScrolling.current = false;
    } else {
      outAutoScroll();
    }
  }, [outAutoScroll, selected]);

  return (
    <div className={clsx(container(), auto ? "h-8 w-16" : "h-8 w-8")}>
      <div className="absolute right-0 flex w-16 flex-nowrap">
        <div
          className={clsx(
            numbers(),
            auto &&
              count >= 3 &&
              "animate-fade-right delay-700 animate-reverse animate-duration-700",
            auto && count === 0 && "animate-fade-left animate-duration-300",
          )}
        >
          <span
            className="relative block h-auto w-auto transition-all duration-500"
            style={{ transform: `translateY(calc(${count} * 2rem * -1 ))` }}
          >
            <span className={textNumber()}>0</span>
            <span className={textNumber()}>1</span>
            <span className={textNumber()}>2</span>
            <span className={textNumber()}>3</span>
          </span>
        </div>
        <button
          onClick={() => {
            if (auto) {
              outAutoScroll();
            }
            if (!auto) onAutoScroll();
          }}
          className="relative h-8 w-8"
        >
          {auto ? (
            <PauseToIcon className={icon()} />
          ) : (
            <PlayToIcon className={icon()} />
          )}
        </button>
      </div>
    </div>
  );
}
