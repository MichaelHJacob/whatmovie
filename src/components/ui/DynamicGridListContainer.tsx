import { ComponentProps, ElementType, useRef } from "react";

import { useDynamicGrid } from "@/hooks/useDynamicGrid";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const dynamicGridContainerStyles = tv({
  slots: {
    container: "no-scrollbar overflow-y-auto",
    scroll: "snap-y snap-mandatory scroll-smooth",
    grid: "grid",
  },
  variants: {
    enable: {
      true: {
        container: "h-full w-full",
        grid: "auto-rows-[calc(100%/var(--rowNumbers))]",
      },
      false: {
        container: "h-auto w-auto",
        grid: "auto-rows-[5rem]",
      },
    },
  },
  defaultVariants: {
    enable: true,
  },
});

type dynamicGridContainerVariants = VariantProps<
  typeof dynamicGridContainerStyles
>;

type DynamicGridListContainerProps<T extends ElementType = "ul"> =
  ComponentProps<T> &
    dynamicGridContainerVariants & {
      as?: T;
      minSize?: number;
      children: React.ReactNode;
    };

export default function DynamicGridListContainer<T extends ElementType = "ul">({
  as,
  children,
  minSize = 112,
  enable = true,
  ...props
}: DynamicGridListContainerProps<T>) {
  const Component = as || "ul";
  const containerRef = useRef<HTMLElement>(null);

  useDynamicGrid({
    ref: containerRef,
    minSize,
    cssVariable: "--rowNumbers",
    type: "row",
    enable,
  });

  const { grid, scroll, container } = dynamicGridContainerStyles({ enable });

  return (
    <Component
      {...props}
      ref={containerRef}
      className={clsx(grid(), scroll(), container(), props.className)}
    >
      {children}
    </Component>
  );
}
