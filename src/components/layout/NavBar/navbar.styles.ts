import { tv } from "tailwind-variants";

export const navbarBase = tv({
  slots: {
    btnHeader:
      "flex min-h-8 appearance-none items-center gap-2 rounded-2xl px-2",
    btnText:
      "textBtn text-base font-semibold leading-normal text-nav transition-colors duration-300 hover:text-nav-hover",
    icon: "box-content h-3 min-w-3 fill-nav stroke-none p-[2px] transition-colors duration-300 hover:fill-nav-hover",
  },
});
