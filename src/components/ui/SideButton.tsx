import { ComponentProps } from "react";

import FoggyEdge from "@/components/ui/FoggyEdge";
import { FoggyEdgeVariants } from "@/components/ui/FoggyEdge";
import GoToButton from "@/components/ui/GoToButton";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const sideButtonStyles = tv({
  slots: {
    base: "absolute z-10 flex h-full w-[--p] items-center justify-center xs:w-[--pXS] md:w-[--pMD] lg:w-[--pLG]",
    button: "shadow-btn-hList",
  },
  variants: {
    model: {
      cards: {
        base: "",
      },
      banner: {
        base: "bg-none",
      },
    },
    hidden: {
      true: {
        button: "opacity-0",
        base: "before:opacity-0 after:opacity-0",
      },
      false: {
        button: "opacity-0 group-hover:opacity-100",
        base: "before:opacity-0 after:opacity-0 before:group-hover:opacity-100 after:group-hover:opacity-100",
      },
    },
  },
});

type SideButtonVariants = VariantProps<typeof sideButtonStyles>;

type SideButtonProps = SideButtonVariants &
  ComponentProps<"div"> & {
    hiddenLeft: boolean;
    hiddenRight: boolean;
    onLeft: () => void;
    onRight: () => void;
    surfaceColor: FoggyEdgeVariants["surfaceColor"];
    noBackdrop?: FoggyEdgeVariants["noBackdrop"];
  };

export default function SideButton({
  noBackdrop = false,
  surfaceColor,
  model,
  hiddenLeft,
  hiddenRight,
  onLeft,
  onRight,
}: Readonly<SideButtonProps>) {
  const { base, button } = sideButtonStyles();

  return (
    <>
      <FoggyEdge
        noBackdrop={model === "banner" || noBackdrop}
        side="left"
        surfaceColor={surfaceColor}
        className={clsx(base({ hidden: hiddenLeft }), "bottom-0 left-0")}
      >
        <GoToButton
          to="left"
          model={model}
          className={clsx(
            button({ hidden: hiddenLeft }),
            hiddenLeft && "-translate-x-full",
          )}
          onClick={onLeft}
        />
      </FoggyEdge>
      <FoggyEdge
        noBackdrop={model === "banner" || noBackdrop}
        side="right"
        surfaceColor={surfaceColor}
        className={clsx(base({ hidden: hiddenRight }), "bottom-0 right-0")}
      >
        <GoToButton
          to="right"
          model={model}
          className={clsx(
            button({ hidden: hiddenRight }),
            hiddenRight && "translate-x-full",
          )}
          onClick={onRight}
        />
      </FoggyEdge>
    </>
  );
}
