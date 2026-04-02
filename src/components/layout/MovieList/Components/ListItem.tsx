import { ComponentProps } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const listItemStyles = tv({
  slots: {
    liContainer: "relative snap-start",
  },
  variants: {
    paddingTop: {
      true: {
        liContainer: "paddingHeader",
      },
    },
    model: {
      cards: {
        liContainer:
          "col-span-10 xs:col-[span_15/span_15] md:col-span-12 lg:col-[span_20/span_20] xl:col-span-12",
      },
      banner: {
        liContainer: "flex-shrink-0",
      },
      list: {
        liContainer: "gridColSpanMovie h-min",
      },
    },
  },
  compoundVariants: [
    {
      model: ["cards", "banner"],
      class: {
        liContainer: "h-full w-full",
      },
    },
  ],
});

export type ListItemVariants = VariantProps<typeof listItemStyles>;

type ListItemProps = ComponentProps<"li"> &
  ListItemVariants & {
    id: string;
  };

export default function ListItem({
  id,
  model,
  paddingTop,
  children,
  ...props
}: ListItemProps) {
  const { liContainer } = listItemStyles({ model, paddingTop });

  return (
    <li
      {...props}
      data-item-id={id}
      className={clsx(liContainer(), props.className)}
    >
      {children}
    </li>
  );
}
