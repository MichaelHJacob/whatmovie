"use client";

import { MutableRefObject, useMemo, useRef } from "react";

import { optionIntoView } from "@/lib/utils/listNavigation";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const indicatorDotsStyles = tv({
  slots: {
    container:
      "relative col-span-1 col-start-2 box-content h-auto w-40 justify-self-center overflow-hidden rounded-3xl px-[6px] lg:border-none lg:backdrop-blur-md lg:backdrop-saturate-150",
    dotsUl:
      "relative m-0 flex h-min w-auto list-none appearance-none flex-nowrap transition-all duration-1000",
    dotsLi:
      "block h-auto w-auto list-none appearance-none transition-transform duration-500",
    dotsButton:
      "relative block h-8 cursor-pointer list-none appearance-none after:block after:h-5 after:w-5 after:rounded-full after:transition-colors after:hover:duration-500",
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
  optionRefs: MutableRefObject<Map<
    string,
    { el: Element; index: number }
  > | null>;
  allOptions: NonNullable<selectOption>[];
  selected: NonNullable<selectOption>[];
  data: DiscoverSchemaType["results"];
};

export default function IndicatorDots({
  optionRefs,
  allOptions,
  selected,
  data,
  model = "banner",
}: Readonly<IndicatorDotsProps>) {
  const optionInView = useRef<NonNullable<selectOption>[]>(
    data.slice(0, 8).map((movie, index) => {
      return { id: movie.id, index: index };
    }),
  );
  const { container, dotsUl, dotsButton, dotsLi } = indicatorDotsStyles({
    model,
  });

  const selectorPosition = useMemo(() => {
    if (
      !selected.length ||
      allOptions.length <= 8 ||
      optionInView.current.length < 8
    )
      return 0;

    if (
      optionInView.current[0].index > 0 &&
      selected[0].index <= optionInView.current[1].index
    ) {
      optionInView.current = allOptions.slice(
        optionInView.current[0].index - 1,
        optionInView.current[7].index,
      );
    } else if (
      selected.at(0) &&
      optionInView.current.at(6) &&
      selected[0].index >= optionInView.current[6].index
    ) {
      if (optionInView.current[7].index < allOptions.length - 1) {
        optionInView.current = allOptions.slice(
          optionInView.current[0].index + 1,
          optionInView.current[7].index + 2,
        );
      }
    }

    if (
      !optionInView.current.some((value) => value.index === selected[0].index)
    ) {
      if (selected[0].index < allOptions.length - 8) {
        optionInView.current = allOptions.slice(
          selected[0].index,
          selected[0].index + 8,
        );
      } else {
        optionInView.current = allOptions.slice(
          allOptions.length - 8,
          allOptions.length,
        );
      }
    }

    return optionInView.current[0].index ?? 0;
  }, [allOptions, selected]);

  return (
    <div className={container()}>
      <ul
        className={clsx(dotsUl())}
        style={{
          transform: `translateX(calc(${selectorPosition} * 1.25rem * -1))`,
        }}
      >
        {data.map((movie, index) => (
          <li
            key={movie.id}
            className={clsx(
              dotsLi(),
              index !== 1 &&
                index !== data.length - 2 &&
                (optionInView.current[1].index === index ||
                  optionInView.current[6].index === index) &&
                "scale-75",
              index !== 0 &&
                index !== data.length - 1 &&
                (index >= optionInView.current[7].index ||
                  index <= optionInView.current[0].index) &&
                "scale-50",
            )}
          >
            <button
              className={clsx(
                dotsButton(),
                selected.map((value) => value.index).includes(index)
                  ? "after:opacity-100"
                  : "after:opacity-30 after:hover:opacity-70",
                "after:scale-[0.4]",
              )}
              onClick={() => {
                const { el } = optionRefs.current?.get(movie.id) ?? {};
                if (el) optionIntoView(el);
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
