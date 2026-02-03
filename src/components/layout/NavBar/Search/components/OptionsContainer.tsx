import { ComponentProps } from "react";

import FoggyEdge from "@/components/ui/FoggyEdge";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const OptionsContainerStyles = tv({
  slots: {
    divContainer: "relative h-auto w-auto",
  },
  variants: {
    active: {
      true: {
        divContainer:
          "max-lg:blockContainer-px shadow-light h-full w-screen max-w-md max-sm:w-screen lg:px-[--pMD]",
      },
      false: {
        divContainer: "w-24 bg-transparent before:hidden after:hidden sm:w-60",
      },
    },
  },
});
type OptionsContainerProps = ComponentProps<"div"> & {
  children: React.ReactNode;
  isExpanded: boolean;
};

export default function OptionsContainer({
  children,
  isExpanded,
  ...props
}: OptionsContainerProps) {
  const { divContainer } = OptionsContainerStyles({
    active: isExpanded,
  });

  return (
    <FoggyEdge
      topHead={true}
      surfaceColor="floating"
      side="bothY"
      onClick={(event) => event.stopPropagation()}
      className={clsx(divContainer(), props.className)}
    >
      {children}
    </FoggyEdge>
  );
}
