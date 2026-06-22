import { ComponentProps, ReactNode } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    button:
      "box-border inline-flex cursor-pointer touch-manipulation select-none appearance-none items-center justify-center gap-2 transition-all duration-300 ease-in-out",
    text: "",
    shadow: "",
    svg: "[&_svg]:h-3 [&_svg]:w-3 [&_svg]:fill-current [&_svg]:stroke-none",
  },
  variants: {
    round: {
      true: {
        button: "rounded-full",
      },
    },
    blur: {
      true: {
        button: "backdrop-blur-md backdrop-saturate-200",
      },
    },
    shadowBtn: {
      true: {
        button: "shadow-btn hover:shadow-btn-hover",
      },
    },
    size: {
      default: {
        button: "h-9 px-3",
      },
      mid: {
        button: "h-11 px-3",
      },
      tall: {
        button: "h-16 px-2",
      },
      short: {
        button: "h-7 px-3",
      },
      custom: "",
    },
    textBtn: {
      true: {
        text: "whitespace-nowrap font-sans text-sm font-bold tracking-normal",
      },
    },
    theme: {
      "neutral-subtle": {
        button: "bg-neutral-subtle",
        text: "text-neutral-subtle hover:text-neutral-strong-hover",
      },
      "neutral-accent": {
        button: "bg-neutral-accent hover:bg-neutral-accent-hover",
        text: "text-inverted-accent",
      },
      base: {
        button: "bg-base-subtle",
        text: "text-base-medium",
      },
      "navigation-cards": {
        button: "bg-navigationBtn hover:bg-navigationBtn-hover",
        text: "text-navigationIcon group-hover/btn:text-navigationIcon-hover",
      },
      "navigation-banner": {
        button: "bg-navigationBtn-black hover/btn:bg-navigationBtn-black-hover",
        text: "text-navigationIcon-black group-hover/btn:text-navigationIcon-black-hover",
      },
    },
  },
  defaultVariants: {
    size: "default",
    blur: false,
    round: false,
  },
  compoundVariants: [
    {
      theme: ["navigation-banner", "navigation-cards"],
      class: {
        button: "z-30 mt-11",
      },
    },
    {
      size: "mid",
      round: false,
      class: {
        button: "rounded-xl",
      },
    },
    {
      round: false,
      class: {
        button: "rounded-lg",
      },
    },
    {
      size: "short",
      class: {
        text: "uppercase",
      },
    },
  ],
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonStyles> &
  Readonly<{
    children: ReactNode;
  }>;

export default function Button({
  children,
  round,
  blur,
  size,
  textBtn,
  theme,
  shadowBtn,
  ...props
}: ButtonProps) {
  const { button, text, shadow, svg } = buttonStyles({
    round,
    blur,
    size,
    textBtn,
    theme,
    shadowBtn,
  });

  return (
    <button
      {...props}
      type="button"
      className={clsx(button(), text(), shadow(), svg(), props.className)}
    >
      {children}
    </button>
  );
}
