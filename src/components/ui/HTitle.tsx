import { ComponentProps, ElementType, ReactNode } from "react";

import { tv } from "tailwind-variants";

export const hTitle = tv({
  base: "whitespace-normal text-lg font-bold leading-snug tracking-normal text-nightDew-600",
});

type HTitleProps<T extends ElementType> = {
  as?: T;
  insideAs?: T;
  children: ReactNode;
} & ComponentProps<T>;

export default function HTitle<T extends ElementType>({
  as,
  insideAs,
  children,
  ...props
}: HTitleProps<T>) {
  const Title = as || "h2";
  const Element = insideAs || "div";
  return (
    <Element className="blockContainer-x min-h-11 w-full py-2 xs:py-[1rem] lg:py-6">
      <Title {...props} className={hTitle({ className: props.className })}>
        {children}
      </Title>
    </Element>
  );
}
