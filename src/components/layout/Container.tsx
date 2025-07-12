import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { VariantProps, tv } from "tailwind-variants";

export const container = tv({
  base: "mx-auto w-full max-w-7xl",
  variants: {
    model: {
      initial:
        "w-full max-md:h-[80vh] md:h-min md:min-h-[min(calc(100vw/(16/9)),calc(90vh-2.75rem))] xl:min-h-[min(calc(80rem/(16/9)),calc(90vh-2.75rem))]",
      banner:
        "relative w-full max-md:aspect-[3/4] md:max-xl:h-[35rem] xl:aspect-[21/9.5] xl:rounded-2xl",
    },
    paddingTop: {
      true: "pt-[calc(2.75rem+var(--p))] xs:pt-[calc(2.75rem+var(--pXS))] md:pt-[calc(2.75rem+var(--pMD))] lg:pt-[calc(2.75rem+var(--pLG))]",
    },
  },
});

type ContainerVariants = VariantProps<typeof container>;

type ContainerProps<T extends ElementType = "div"> = ContainerVariants &
  ComponentPropsWithoutRef<T> & {
    as?: T;
    innerStyles?: string;
    paddingTop?: boolean;
    children: ReactNode;
  };

export default function Container<T extends ElementType = "div">({
  as,
  model,
  innerStyles,
  children,
  paddingTop = false,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component {...props} className={`w-full ${props.className} `}>
      <div className={container({ model, className: innerStyles, paddingTop })}>
        {children}
      </div>
    </Component>
  );
}
