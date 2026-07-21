import { buttonStyles } from "@/components/ui/Button";
import clsx from "clsx";
import { tv } from "tailwind-variants";

export const navbarBase = tv({
  slots: {
    btnHeader: clsx(buttonStyles({ size: "custom" }).button(), "h-8 px-2"),
    btnText: clsx(
      buttonStyles({ textBtn: true }).text(),
      "text-base font-semibold leading-normal text-nav hover:text-nav-hover",
    ),
    icon: buttonStyles({ size: "custom" }).svg(),
  },
});
