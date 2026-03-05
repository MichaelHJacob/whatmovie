import { ComponentProps } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const breakHrStyles = tv({
  base: "mx-auto my-0 rounded-lg border-t border-solid border-t-base-accent",
  variants: {
    wFull: {
      true: "w-full",
      false:
        "w-[calc(100%-2*var(--p))] xs:w-[calc(100%-2*var(--pXS))] md:w-[calc(100%-2*var(--pMD))] lg:w-[calc(100%-2*var(--pLG))] lg:max-w-[calc(80rem-2*var(--pLG))]",
    },
  },
  defaultVariants: {
    wFull: false,
  },
});

type BreakHrVariants = VariantProps<typeof breakHrStyles>;

type BreakHrProps = ComponentProps<"hr"> & BreakHrVariants;

export default function BreakHr({ wFull, ...props }: Readonly<BreakHrProps>) {
  return (
    <hr
      {...props}
      className={clsx(breakHrStyles({ wFull }), props.className)}
    />
  );
}
