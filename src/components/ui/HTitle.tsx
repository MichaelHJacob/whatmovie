import { ComponentProps, ElementType, ReactNode } from "react";

import clsx from "clsx";
import { tv } from "tailwind-variants";

const hTitle = tv({
  base: "whitespace-normal font-sans text-lg font-semibold leading-snug -tracking-wide text-neutral-strong",
});

type HTitleProps<T extends ElementType> = {
  as?: T;
  asContainer?: T;
  containerStyles?: string;
  children: ReactNode;
  container: boolean;
} & ComponentProps<T>;

export default function HTitle<T extends ElementType>({
  asContainer,
  as,
  containerStyles,
  container = true,
  children,
  ...props
}: HTitleProps<T>) {
  const Element = asContainer || "div";
  const Title = as || "h2";

  if (container) {
    return (
      <Element
        className={clsx(
          "blockContainer-px min-h-11 w-full py-2 xs:py-[1rem] lg:py-6",
          containerStyles,
        )}
      >
        <Title {...props} className={hTitle({ className: props.className })}>
          {children}
        </Title>
      </Element>
    );
  }

  return (
    <Title {...props} className={hTitle({ className: props.className })}>
      {children}
    </Title>
  );
}
