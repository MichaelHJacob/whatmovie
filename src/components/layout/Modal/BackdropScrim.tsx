import { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const backdropScrimStyles = tv({
  base: "invisible fixed inset-0 h-dvh w-screen opacity-0 transition-all duration-1000 peer-data-[bgscrim='true']:visible peer-data-[bgscrim='true']:opacity-100",
  variants: {
    mode: {
      menu: "bg-scrim-menu backdrop-blur-xl",
      modal: "bg-scrim-modal backdrop-blur-sm",
    },
  },
  defaultVariants: {
    mode: "menu",
  },
});

type BackdropScrimProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof backdropScrimStyles>;

export default function BackdropScrim({
  mode,
  ...props
}: Readonly<BackdropScrimProps>) {
  return (
    <div
      id="scrim"
      {...props}
      className={clsx(backdropScrimStyles({ mode }), props.className)}
    />
  );
}
