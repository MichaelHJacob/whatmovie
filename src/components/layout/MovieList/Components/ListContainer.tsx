import { ComponentProps } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const ListContainerStyles = tv({
  slots: {
    ulContainer: "relative list-none",
    ulScroller:
      "no-scrollbar snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth",
  },
  variants: {
    model: {
      cards: {
        ulContainer: "grid-rows-1 max-md:pb-[--pMD]",
      },
      banner: {
        ulContainer: "flex flex-row flex-nowrap",
      },
      list: {
        ulContainer: "grid-rows-[min-content] items-end",
      },
    },
  },
  compoundVariants: [
    {
      model: ["cards", "list"],
      class: {
        ulContainer:
          "blockContainer-px blockContainer-py reducerBlock-t gridAutoSpace grid grid-flow-col",
        ulScroller: "scroll-px",
      },
    },
    {
      model: ["cards", "banner"],
      class: {
        ulContainer:
          "z-0 h-[80vh] min-h-96 w-full max-md:h-[80vh] md:h-[min(calc(100vw/(16/9)),calc(90vh-2.75rem))] xl:h-[min(calc(80rem/(16/9)),calc(90vh-2.75rem))]",
      },
    },
  ],
});

export type ListContainerVariants = VariantProps<typeof ListContainerStyles>;

type ListContainerProps = ComponentProps<"ul"> & ListContainerVariants;

export default function ListContainer({
  model,
  children,
  ...props
}: Readonly<ListContainerProps>) {
  const { ulContainer, ulScroller } = ListContainerStyles({
    model,
  });

  return (
    <ul
      {...props}
      data-scroll-container
      className={clsx(ulContainer(), ulScroller(), props.className)}
    >
      {children}
    </ul>
  );
}
