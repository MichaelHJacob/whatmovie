import { tv } from "tailwind-variants";

export const filterMenuBase = tv({
  slots: {
    field: "all-gap blockContainer-px flex flex-col",
    title: "py-2 text-base font-semibold leading-5 text-placeholder",
    innerField: "h-auto w-full select-none gap-2",
    topButton:
      "blockContainer-px absolute right-0 top-0 flex h-11 max-w-min -translate-y-full items-center justify-end",
  },
  variants: {
    fieldset: {
      true: {
        field: "relative border-none pt-2 md:pt-5",
        title: "flex min-h-11 items-center whitespace-normal",
      },
    },
  },
  defaultVariants: {
    fieldset: true,
  },
});
