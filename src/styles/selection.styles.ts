import { tv } from "tailwind-variants";

export const selectionItemBase = tv({
  slots: {
    li: "w-full snap-start appearance-none rounded-xl px-2 aria-selected:bg-neutral-accent",
    contentBox: "flex h-full w-full gap-2",
    img: "my-2 h-[calc(100%-1rem)] rounded-md object-cover",
    textBox:
      "relative top-[1px] flex min-h-full w-full flex-col items-start justify-center border-b-2 border-base-minimal group-last/list:border-transparent group-aria-selected/list:border-transparent",
    text: "whitespace-normal text-start font-sans text-base font-medium leading-normal tracking-normal text-neutral-strong transition-colors duration-300 group-hover/list:text-neutral-strong-hover group-aria-selected/list:text-inverted-accent",
  },
});
