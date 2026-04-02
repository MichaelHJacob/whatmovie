"use client";

import { useRef } from "react";

import { optionIntoView } from "@/lib/utils/listNavigation";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const indicatorDotsStyles = tv({
  slots: {
    container:
      "relative col-span-1 col-start-2 box-content h-auto w-auto max-w-40 justify-self-center overflow-hidden rounded-3xl px-[6px] lg:border-none lg:backdrop-blur-md lg:backdrop-saturate-150",
    dotsUl:
      "relative m-0 flex h-min w-auto list-none appearance-none flex-nowrap transition-all duration-1000",
    dotsLi:
      "block h-auto w-auto list-none appearance-none transition-transform duration-500",
    dotsButton:
      "relative block h-8 cursor-pointer list-none appearance-none after:block after:h-5 after:w-5 after:rounded-full after:transition-opacity after:hover:duration-500",
  },
  variants: {
    model: {
      cards: {
        container: "",
        dotsButton: "after:bg-neutral-accent",
      },
      banner: {
        container: "lg:bg-black-dimmed",
        dotsButton: "after:bg-white-accent",
      },
    },
  },
});

type IndicatorDotsVariants = VariantProps<typeof indicatorDotsStyles>;

type IndicatorDotsProps = IndicatorDotsVariants & {
  optionMap: Map<string, HTMLElement>;
  allOptions: NonNullable<selectOption>[];
  selected: NonNullable<selectOption>[];
  data: DiscoverSchemaType["results"];
};

export default function IndicatorDots({
  optionMap,
  allOptions,
  selected,
  data,
  model = "banner",
}: Readonly<IndicatorDotsProps>) {
  const optInView = useRef<NonNullable<selectOption>[]>(allOptions.slice(0, 8));
  const { container, dotsUl, dotsButton, dotsLi } = indicatorDotsStyles({
    model,
  });

  const firstSelected = selected.at(0)?.index;
  const lastSelected = selected.at(-1)?.index;
  const firstInView = optInView.current.at(0)?.index ?? 0;
  const secondInView = optInView.current.at(1)?.index;
  const penultInView = optInView.current.at(-2)?.index;
  const lastInView = optInView.current.at(-1)?.index ?? 7;

  if (
    secondInView != undefined &&
    penultInView !== undefined &&
    firstSelected !== undefined &&
    lastSelected !== undefined
  ) {
    if (lastSelected >= penultInView && lastSelected <= allOptions.length - 3) {
      optInView.current = allOptions.slice(penultInView - 5, penultInView + 3);
    } else if (firstSelected >= 2 && firstSelected <= secondInView) {
      optInView.current = allOptions.slice(secondInView - 2, secondInView + 6);
    } else if (lastSelected >= penultInView) {
      optInView.current = allOptions.slice(-8);
    } else if (firstSelected <= 2) {
      optInView.current = allOptions.slice(0, 8);
    }
  }

  return (
    <div className={container()}>
      <ul
        className={clsx(dotsUl())}
        style={{
          transform: `translateX(calc(${firstInView} * 1.25rem * -1))`,
        }}
      >
        {data.map((movie, index) => (
          <li
            key={movie.id}
            className={clsx(
              dotsLi(),
              ((secondInView !== 1 && secondInView === index) ||
                (penultInView !== data.length - 2 && penultInView === index)) &&
                "scale-75",
              ((lastInView !== data.length - 1 && index >= lastInView) ||
                (firstInView !== 0 && index <= firstInView)) &&
                "scale-50",
            )}
          >
            <button
              className={clsx(
                dotsButton(),
                selected.map((value) => value.index).includes(index)
                  ? "after:opacity-100 after:duration-100"
                  : "after:opacity-30 after:duration-1000 after:hover:opacity-70",
                "after:scale-[0.4]",
              )}
              onClick={() => {
                const card = optionMap.get(movie.id);
                if (card) optionIntoView(card);
              }}
            >
              <span className="sr-only">{movie.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
