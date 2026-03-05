import { tv } from "tailwind-variants";

export const movieBase = tv({
  slots: {
    container: "paddingHeader relative h-min w-full",
    innerContainer:
      "md:gridTemplateSpace blockContainer-p relative w-full items-center max-md:flex max-md:flex-col max-md:items-start xl:grid-cols-[repeat(20,_minmax(0,_1fr))]",
    raised:
      "bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-raised before:backdrop-blur-md",
    imgContainer:
      "relative block h-auto w-full after:absolute after:inset-0 after:block after:rounded-xl after:shadow-card max-md:min-w-52 max-md:max-w-[calc(75vh*(2/3))] after:max-xs:shadow-card-subtle md:col-span-4 lg:col-span-5",
    img: "w-full rounded-xl max-md:min-w-52 max-md:max-w-[calc(75vh*(2/3))]",
    imgUnavailable:
      "bg-gradient-default flex aspect-[2/3] flex-col items-center justify-center gap-5 overflow-hidden break-words pb-10 pt-10",
    descriptionContainer:
      "all-gap max-md:blockContainer-pt relative flex h-auto w-full flex-col justify-center md:col-span-8 lg:col-[span_15_/_span_15]",
  },
});
