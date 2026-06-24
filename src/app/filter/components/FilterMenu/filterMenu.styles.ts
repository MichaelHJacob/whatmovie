import { tv } from "tailwind-variants";

export const filterMenuBase = tv({
  slots: {
    field: "all-gap blockContainer-px flex flex-col",
    title: "py-2 text-base font-semibold leading-5 text-placeholder",
    innerField: "h-auto w-full select-none gap-2",
    topButton:
      "flex items-center max-w-min justify-end h-11 blockContainer-px right-0 absolute top-0 -translate-y-full",
  },
  variants: {
    fieldset: {
      true: {
        field: "border-none relative pt-2 md:pt-5",
        title: "min-h-11 flex items-center whitespace-normal",
      },
    },
  },
  defaultVariants: {
    fieldset: true,
  },
});
