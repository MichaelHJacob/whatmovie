"use client";

import { ComponentProps } from "react";

import { useAutoScrollRef } from "@/hooks/useAutoScrollRef";
import { ObjVideoType } from "@/lib/validation/videosSchema";
import { selectionItemBase } from "@/styles/selection.styles";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type VideosCardProps = ComponentProps<"li"> & {
  data: ObjVideoType;
  isSelected: boolean;
  isScrollActive: boolean;
};

const videoCardStyles = tv({
  extend: selectionItemBase,
  slots: {
    li: "group/list row-span-1 max-lg:aria-selected:bg-white-accent",
    img: "aspect-video",
    text: "line-clamp-2 max-lg:text-white-strong max-lg:group-hover/list:text-white-hover max-lg:group-aria-selected/list:text-black-accent",
  },
});

export default function VideoCard({
  data,
  isSelected,
  isScrollActive,
  ...props
}: Readonly<VideosCardProps>) {
  const { li, contentBox, img, textBox, text } = videoCardStyles();
  const setItemRef = useAutoScrollRef(data.id, isSelected, isScrollActive);

  return (
    <li {...props} ref={setItemRef} id={data.id} className={li()}>
      <button className={contentBox()}>
        <img
          src={`https://i.ytimg.com/vi/${data.key}/hqdefault.jpg`}
          className={img()}
          alt={data.name}
        />
        <div className={clsx(textBox(), "max-lg:border-white-minimal")}>
          <p className={text()}>{data.name}</p>
        </div>
      </button>
    </li>
  );
}
