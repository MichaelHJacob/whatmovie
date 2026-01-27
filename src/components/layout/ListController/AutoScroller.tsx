import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
      "group relative box-content h-8 w-8 cursor-pointer justify-self-end overflow-hidden rounded-3xl shadow-black/20 transition-all duration-500 lg:hover:shadow-sm lg:hover:backdrop-blur-md lg:hover:backdrop-saturate-200",
    numbers:
      "relative box-content block h-8 w-8 rounded-md transition-all duration-500 before:absolute before:right-1/2 before:top-1/2 before:block before:h-4 before:w-4 before:-translate-y-1/2 before:translate-x-1/2 before:rounded-md before:content-[''] group-hover:animate-none group-hover:opacity-0",
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
  optionRefs: MutableRefObject<Map<
    string,
    { el: Element; index: number }
  > | null>;
  containerRef: RefObject<HTMLUListElement>;
  allOptions: NonNullable<selectOption>[];
  selected: NonNullable<selectOption>[];
};

export default function AutoScroller({
  optionRefs,
  containerRef,
  allOptions,
  selected,
  model = "banner",
}: Readonly<AutoScrollerProps>) {
  const { container, numbers, icon, textNumber } = autoScrollStyles({ model });

  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);
  const currentOptionID = useRef<string | null>(null);
  const interval = useRef<NodeJS.Timeout>();
  const ids = useMemo(() => {
    return allOptions.map((value) => value.id);
  }, [allOptions]);

  useEffect(() => {
    function step() {
      setCount((c) => c + 1);
      if (count >= 3) {
        setCount(0);
        const next = getNextOption(ids, selected[0].index);
        if (next) {
          const { el } = optionRefs.current?.get(next.id) ?? {};
          if (el) optionIntoView(el);
        }
      }
    }

    if (auto) {
      interval.current = setInterval(step, 1000);
    }
    return () => clearInterval(interval.current);
  }, [auto, count, ids, optionRefs, selected]);

  const onAutoScroll = useCallback(() => {
    setAuto(true);
  }, []);
  const outAutoScroll = useCallback(() => {
    clearInterval(interval.current);
    setCount(0);
    setAuto(false);
  }, []);

  useIntersectionObserver({
    targetRef: containerRef,
    onIntersect: onAutoScroll,
    outIntersect: outAutoScroll,
    threshold: 0.9,
  });

  if (count === 0 && selected.at(0)) {
    currentOptionID.current = selected[0].id;
  }

  if (selected.at(0) && currentOptionID.current !== selected[0].id) {
    clearInterval(interval.current);
    setCount(0);
    setAuto(false);
  }

  return (
    <div className={container()}>
      <div className={clsx("flex w-auto flex-nowrap")}>
        <div
          className={clsx(
            numbers(),
            auto &&
              count >= 3 &&
              "animate-fade-right delay-700 animate-reverse animate-duration-700",
            auto && count === 0 && "animate-fade-left animate-duration-300",
            auto ? "opacity-100" : "opacity-0",
          )}
        >
          <span
            className={clsx(
              "relative block h-auto w-auto transition-all duration-500",
            )}
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
              setCount(0);
              clearInterval(interval.current);
              setAuto(false);
            }
            if (!auto) setAuto(true);
          }}
          className={clsx(
            "transition-transform duration-500 ease-in-out",
            auto ? "group-hover:-translate-x-full" : "-translate-x-full",
          )}
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
