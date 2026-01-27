import { ComponentProps } from "react";

import clsx from "clsx";
import { tv } from "tailwind-variants";

type BreakHrProps = ComponentProps<"hr">;

const breakHrStyles = tv({
  base: "mx-auto my-0 w-[calc(100%-2*var(--p))] rounded-lg border-t border-solid border-t-base-accent xs:w-[calc(100%-2*var(--pXS))] md:w-[calc(100%-2*var(--pMD))] lg:w-[calc(100%-2*var(--pLG))] lg:max-w-[calc(80rem-2*var(--pLG))]",
});

export default function BreakHr({ ...props }: Readonly<BreakHrProps>) {
  return <hr {...props} className={clsx(breakHrStyles(), props.className)} />;
}
