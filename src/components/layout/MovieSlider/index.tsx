"use client";

import { ComponentProps, useMemo, useRef } from "react";

import ListController from "@/components/layout/ListController";
import ContentSlider from "@/components/layout/MovieSlider/Components/ContentSlider";
import { useListItemObserver } from "@/hooks/useListItemObserver";
import { useLockScrollOnResize } from "@/hooks/useLockScrollOnResize";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const movieSliderStyles = tv({
  slots: {
    ulContainer:
      "relative z-0 h-[80vh] min-h-96 w-full max-md:h-[80vh] md:h-[min(calc(100vw/(16/9)),calc(90vh-2.75rem))] xl:h-[min(calc(80rem/(16/9)),calc(90vh-2.75rem))]",
    ulScroller:
      "no-scrollbar snap-x snap-mandatory list-none overflow-y-hidden overflow-x-scroll overscroll-x-contain",
    liContainer: "relative h-full w-full snap-start",
  },
  variants: {
    paddingTop: {
      true: {
        liContainer: "paddingHeader",
      },
    },
    model: {
      cards: {
        ulContainer:
          "blockContainer-px blockContainer-py reducerBlock-t gridAutoSpace scroll-px grid grid-flow-col grid-rows-1 max-md:pb-[--pMD]",
        liContainer:
          "col-span-10 xs:col-[span_15/span_15] md:col-span-12 lg:col-[span_20/span_20] xl:col-span-12",
      },
      banner: {
        liContainer: "flex-shrink-0",
        ulContainer: "flex flex-row flex-nowrap",
      },
    },
  },
});

type MovieSliderVariants = VariantProps<typeof movieSliderStyles>;

type MovieSliderProps = ComponentProps<"ul"> &
  MovieSliderVariants & {
    data: DiscoverSchemaType;
    innerStyles?: string;
  };

export default function MovieSlider({
  data,
  innerStyles,
  model = "cards",
  paddingTop,
  ...props
}: Readonly<MovieSliderProps>) {
  const cardRefs = useRef<Map<string, { el: Element; index: number }> | null>(
    null,
  );
  const ulContainerRef = useRef<HTMLUListElement>(null);
  const { ulContainer, ulScroller, liContainer } = movieSliderStyles({
    model,
    paddingTop,
  });

  const dataValide = useMemo(
    () => data.results.filter((d) => d.backdrop_path),
    [data],
  );

  const visibleIDs = useListItemObserver({
    margin: "0px -52px 0px -52px",
    rootElement: ulContainerRef,
    optionRefs: cardRefs,
  });

  useLockScrollOnResize(ulContainerRef);

  function getMap() {
    if (!cardRefs.current) {
      cardRefs.current = new Map();
    }
    return cardRefs.current;
  }

  return (
    <ListController
      optionRefs={cardRefs}
      data={dataValide}
      selected={visibleIDs.slice(0, 1)}
      containerRef={ulContainerRef}
      model={model}
    >
      <ul
        {...props}
        ref={ulContainerRef}
        className={clsx(ulContainer(), ulScroller(), props.className)}
      >
        {dataValide.map((data, index) => {
          return (
            <li
              key={data.id}
              data-movie-id={data.id}
              className={clsx(innerStyles, liContainer())}
              ref={(element) => {
                const map = getMap();
                if (element) map.set(data.id, { el: element, index: index });

                return () => {
                  map.clear();
                };
              }}
            >
              <ContentSlider
                key={data.id}
                data={data}
                selected={visibleIDs.slice(0, 1)}
                model={model}
              />
            </li>
          );
        })}
      </ul>
    </ListController>
  );
}
