import { tv } from "tailwind-variants";

export const navbarBase = tv({
  slots: {
    btnHeader:
      "flex min-h-8 appearance-none items-center gap-2 rounded-2xl px-2",
    btnText:
      "textBtn text-base font-semibold leading-normal transition-colors duration-300",
    icon: "box-content h-3 min-w-3 stroke-none p-[2px] transition-colors duration-300",
  },
  variants: {
    dark: {
      true: {
        btnText: "text-nav-white hover:text-nav-white-hover",
        icon: "fill-nav-white stroke-none hover:fill-nav-hover",
      },
      false: {
        btnText: "text-nav hover:text-nav-hover",
        icon: "fill-nav stroke-none hover:fill-nav-hover",
      },
    },
  },
  defaultVariants: {
    dark: false,
  },
});
