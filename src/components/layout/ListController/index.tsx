"use client";

import { ReactNode, useRef } from "react";

import AutoScroller from "@/components/layout/ListController/AutoScroller";
import IndicatorDots from "@/components/layout/ListController/IndicatorDots";
import { ListControllerProvider } from "@/components/layout/ListController/ListControllerContext";
import { FoggyEdgeVariants } from "@/components/ui/FoggyEdge";
import SideButton from "@/components/ui/SideButton";
import { useListItemObserver } from "@/hooks/useListItemObserver";
import { useLockScrollOnResize } from "@/hooks/useLockScrollOnResize";
import { useSelectorByAttribute } from "@/hooks/useSelectorByAttribute";
import {
  getNextOption,
  getPreviousOption,
  optionIntoView,
} from "@/lib/utils/listNavigation";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectOption } from "@/types/globalTypes";

type ListControllerProps = {
  children: ReactNode;
  data?: DiscoverSchemaType["results"];
  model: "cards" | "banner" | "list";
  options: NonNullable<selectOption>[];
  ids: string[];
  surfaceColor?: FoggyEdgeVariants["surfaceColor"];
};

export default function ListController({
  children,
  data,
  model,
  options,
  ids,
  surfaceColor,
}: Readonly<ListControllerProps>) {
  const rootRef = useRef<HTMLDivElement>(null);

  const { container, getMap } = useSelectorByAttribute(rootRef);

  useLockScrollOnResize(container);

  const visibleIDs = useListItemObserver({
    margin: "0px -16px 0px -16px",
    optionIDs: ids,
    containerNode: container,
    optionMap: getMap(),
    threshold: model === "cards" || model === "banner" ? 0.1 : 0.9,
  });

  function handleToLeft() {
    const currentIndex = visibleIDs.at(0)?.index;
    if (!currentIndex) return;
    const back = getPreviousOption({
      optionIDs: ids,
      currentIndex,
      steps: visibleIDs.length,
    });
    if (!back) return;

    const el = getMap().get(back.id);
    if (el) optionIntoView(el);
  }

  function handleToRight() {
    const next = getNextOption({
      optionIDs: ids,
      currentIndex: visibleIDs.at(-1)?.index ?? visibleIDs.length - 1,
      steps: visibleIDs.length,
    });
    if (!next) return;

    const el = getMap().get(next.id);
    if (el) optionIntoView(el);
  }

  return (
    <div ref={rootRef} className="group relative h-auto w-auto">
      <ListControllerProvider value={{ selected: visibleIDs }}>
        {children}
        <SideButton
          hiddenLeft={visibleIDs.some((s) => s.index === 0)}
          onLeft={handleToLeft}
          onRight={handleToRight}
          noBackdrop={model === "banner"}
          surfaceColor={surfaceColor}
          model={model === "list" ? "cards" : model}
        />
        {(model === "cards" || model === "banner") && data && (
          <div className="all-gap blockContainer-px absolute bottom-0 z-10 grid h-[--pMD] w-full grid-cols-3 grid-rows-1 items-center lg:h-[--pLG]">
            <IndicatorDots
              optionMap={getMap()}
              allOptions={options}
              selected={visibleIDs}
              data={data}
              model={model}
            />
            <AutoScroller
              optionMap={getMap()}
              optionsIDs={ids}
              selected={visibleIDs.at(0) || null}
              containerNode={container}
              model={model}
            />
          </div>
        )}
      </ListControllerProvider>
    </div>
  );
}
