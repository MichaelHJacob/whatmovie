"use client";

import { MutableRefObject, ReactNode, RefObject, useMemo } from "react";

import AutoScroller from "@/components/layout/ListController/AutoScroller";
import IndicatorDots from "@/components/layout/ListController/IndicatorDots";
import SideButton from "@/components/ui/SideButton";
import {
  getNextOption,
  getPreviousOption,
  optionIntoView,
} from "@/lib/utils/listNavigation";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectOption } from "@/types/globalTypes";

type ListControllerProps = {
  children: ReactNode;
  containerRef: RefObject<HTMLUListElement>;
  optionRefs: MutableRefObject<Map<
    string,
    { el: Element; index: number }
  > | null>;
  data: DiscoverSchemaType["results"];
  selected: NonNullable<selectOption>[];
  model: "cards" | "banner";
};

export default function ListController({
  children,
  containerRef,
  optionRefs,
  data,
  selected,
  model = "banner",
}: Readonly<ListControllerProps>) {
  const movieOptions: NonNullable<selectOption>[] = useMemo(() => {
    return data.map((value, index) => {
      return { id: value.id, index: index };
    });
  }, [data]);

  const ids = useMemo(() => {
    return movieOptions.map((value) => value.id);
  }, [movieOptions]);

  function handleToLeft() {
    const back = getPreviousOption(ids, selected[0].index);
    if (back && optionRefs.current) {
      const { el } = optionRefs.current.get(back.id) ?? {};
      if (el) optionIntoView(el);
    }
  }

  function handleToRight() {
    const next = getNextOption(ids, selected[0].index);
    if (next) {
      const { el } = optionRefs.current?.get(next.id) ?? {};
      if (el) optionIntoView(el);
    }
  }

  return (
    <div className="group relative h-auto w-auto">
      {children}
      <SideButton
        hiddenLeft={selected.some((s) => s.index === 0)}
        hiddenRight={selected.some((s) => s.id === ids[ids.length - 1])}
        onLeft={handleToLeft}
        onRight={handleToRight}
        noBackdrop={model === "banner"}
        surfaceColor={model === "cards" ? "body" : undefined}
        model={model}
      />
      <div className="all-gap blockContainer-px absolute bottom-0 z-10 grid h-[--pMD] w-full grid-cols-3 grid-rows-1 items-center lg:h-[--pLG]">
        <IndicatorDots
          optionRefs={optionRefs}
          allOptions={movieOptions}
          selected={selected}
          data={data}
          model={model}
        />
        <AutoScroller
          optionRefs={optionRefs}
          allOptions={movieOptions}
          selected={selected}
          containerRef={containerRef}
          model={model}
        />
      </div>
    </div>
  );
}
