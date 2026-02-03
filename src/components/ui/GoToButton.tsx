import { ComponentProps } from "react";

import BackToIcon from "@/assets/icons/toLeft.svg";
import NextToIcon from "@/assets/icons/toRight.svg";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const goToButtonStyles = tv({
  slots: {
    button:
      "group/btn z-30 mt-11 box-content h-14 rounded-lg px-1 backdrop-blur-md backdrop-saturate-200 transition-all duration-300 ease-in-out lg:px-[0.375rem]",
    icon: "box-border h-3 w-3 transition-colors duration-300",
  },
  variants: {
    model: {
      cards: {
        button: "bg-navigationBtn hover:bg-navigationBtn-hover",
        icon: "fill-navigationIcon group-hover/btn:fill-navigationIcon-hover",
      },
      banner: {
        button: "bg-navigationBtn-black hover/btn:bg-navigationBtn-black-hover",
        icon: "fill-navigationIcon-black group-hover/btn:fill-navigationIcon-black-hover",
      },
    },
  },
});

type buttonVariants = VariantProps<typeof goToButtonStyles>;

type GoToButtonProps = buttonVariants &
  ComponentProps<"button"> & {
    to: "left" | "right";
  };

export default function GoToButton({
  model = "banner",
  to,
  ...props
}: Readonly<GoToButtonProps>) {
  const { button, icon } = goToButtonStyles({ model });

  return (
    <button {...props} className={clsx(button(), props.className)}>
      {to === "left" ? (
        <BackToIcon className={clsx(icon())} />
      ) : (
        <NextToIcon className={clsx(icon())} />
      )}
    </button>
  );
}
