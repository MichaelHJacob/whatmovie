import { ComponentProps } from "react";

import clsx from "clsx";

type VerticalCardsProps = ComponentProps<"div"> & {
  size?: number;
};

export default function SkeletonVerticalCards({
  size = 7,
  ...props
}: Readonly<VerticalCardsProps>) {
  return [...Array(size)].map((_, i) => (
    <div
      key={i}
      {...props}
      className={clsx("all-gap box-border flex h-full w-full", props.className)}
    >
      <div className="my-2 box-border aspect-[2/3] h-[calc(100%-1rem)] rounded-xl border-4 border-base-minimal bg-inverted-minimal md:my-3 md:h-[calc(100%-1.5rem)]" />
      <div className="relative top-[1px] flex w-full flex-col items-start justify-center border-b-2 border-base-minimal">
        <div className="mb-2 h-4 w-2/4 rounded-full border-4 border-base-minimal bg-inverted-minimal" />
        <div className="mb-2 h-4 w-2/5 rounded-full border-4 border-base-minimal bg-inverted-minimal" />
        <div className="h-4 w-2/3 rounded-full border-4 border-base-minimal bg-inverted-minimal" />
      </div>
    </div>
  ));
}
