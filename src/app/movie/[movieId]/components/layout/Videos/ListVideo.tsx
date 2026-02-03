"use client";

import { KeyboardEvent, useMemo, useState } from "react";

import VideoCard from "@/app/movie/[movieId]/components/layout/Videos/VideoCard";
import DynamicGridListContainer from "@/components/ui/DynamicGridListContainer";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { ObjVideoType } from "@/lib/validation/videosSchema";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type ListVideoProps = {
  data: ObjVideoType[];
  onToggleSelect: (option: selectOption) => void;
  selected: selectOption;
};

export const selectionContainerBase = tv({
  slots: {
    selectionBar:
      "blockContainer-px blockContainer-py h-auto w-full max-lg:overflow-y-visible lg:h-full lg:scroll-py-[calc(var(--pLG)+1rem)] lg:py-[calc(var(--pLG)+1rem)]",
    ul: "inset-0 grid-cols-1 max-lg:auto-rows-[5rem] lg:absolute",
  },
});

export default function ListVideo({
  data,
  onToggleSelect,
  selected,
}: Readonly<ListVideoProps>) {
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(false);
  const videoIDs: string[] | null = useMemo(() => {
    return data.map((value) => value.id);
  }, [data]);

  const { ul, selectionBar } = selectionContainerBase();

  function isSelected(id: string, i: number): boolean {
    if (!selected) return false;

    if (selected.id === id && selected.index === i) {
      return true;
    }
    return false;
  }

  const { handleKeyDown } = useKeyboardNavigation({
    onToggleSelect: onToggleSelect,
    optionIDs: videoIDs,
    selected,
  });

  return (
    <DynamicGridListContainer
      role="listbox"
      tabIndex={0}
      minSize={64}
      enable={data.length > 5}
      aria-labelledby="listBoxVideoLabel"
      onKeyDown={(event: KeyboardEvent<HTMLUListElement>) => {
        handleKeyDown(event);
        setIsAutoScrollActive(true);
      }}
      className={clsx(selectionBar(), ul())}
      aria-activedescendant={selected ? selected.id.toString() : undefined}
    >
      {data.map((value, index) => (
        <VideoCard
          key={`${index}_${value.id}`}
          id={value.id}
          role="option"
          aria-selected={isSelected(value.id, index)}
          data={value}
          isSelected={isSelected(value.id, index)}
          isScrollActive={isAutoScrollActive}
          onClick={() => {
            onToggleSelect({ id: value.id, index: index });
            setIsAutoScrollActive(false);
          }}
        />
      ))}
    </DynamicGridListContainer>
  );
}
