import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const containerStyles = tv({
  slots: {
    base: "mx-auto w-full max-w-7xl",
    container: "w-full",
  },
  variants: {
    model: {
      initial: {
        base: "w-full max-md:h-[80vh] md:h-min md:min-h-[min(calc(100vw/(16/9)),calc(90vh-2.75rem))] xl:min-h-[min(calc(80rem/(16/9)),calc(90vh-2.75rem))]",
      },
      banner: {
        base: "relative overflow-hidden rounded-3xl max-md:aspect-[3/4] md:max-xl:h-[35rem] xl:aspect-[16/9] xl:max-h-[calc(95vh-2.75rem)]",
      },
    },
    surface: {
      listBase: {
        container: "bg-inverted-accent",
      },
      body: {
        container: "bg-body",
      },
    },
    paddingTop: {
      true: {
        base: "paddingHeader",
      },
    },
  },
});

type ContainerVariants = VariantProps<typeof containerStyles>;

type ContainerProps<T extends ElementType = "div"> = ContainerVariants &
  ComponentPropsWithoutRef<T> &
  Readonly<{
    as?: T;
    innerStyles?: string;
    children: ReactNode;
  }>;

export default function Container<T extends ElementType = "div">({
  as,
  model,
  innerStyles,
  children,
  paddingTop = false,
  surface,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  const { base, container } = containerStyles({
    model,
    paddingTop,
    surface,
  });

  return (
    <Component {...props} className={clsx(container(), props.className)}>
      <div className={clsx(base(), innerStyles)}>{children}</div>
    </Component>
  );
}
