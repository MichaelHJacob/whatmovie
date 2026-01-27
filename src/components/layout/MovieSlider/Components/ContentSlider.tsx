import { ComponentProps } from "react";

import Link from "next/link";

import { BACKDROP } from "@/config/imageConfig";
import { DiscoverSchemaType } from "@/lib/validation/discoverSchema";
import { selectOption } from "@/types/globalTypes";
import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

const contentSliderStyles = tv({
  slots: {
    link: "relative flex h-full flex-col justify-between",
    figure: "absolute inset-0 -z-10 m-0 h-full w-full",
    img: "h-full w-full object-cover object-center brightness-90",
    textContainer:
      "all-gap blockContainer-px blockContainer-py absolute bottom-0 left-0 z-0 flex h-min w-full flex-col items-start justify-between before:absolute before:bottom-0 before:left-0 before:-z-10 before:block before:h-full before:w-full before:bg-gradient-to-t before:from-black/30 before:to-black/5 before:opacity-0 before:backdrop-blur-3xl before:backdrop-saturate-150 before:animate-duration-[2s] before:animate-ease-in-out before:[mask-image:linear-gradient(to_top,#000000_50%,#00000099_75%,#00000000)]",
    title:
      "line-clamp-1 text-left font-sans text-3xl font-black text-white-accent opacity-0 animate-delay-500 animate-duration-1000 animate-ease-in-out",
    overview:
      "line-clamp-2 text-left font-sans text-base font-bold text-white-strong opacity-0 animate-delay-700 animate-duration-1000 animate-ease-in-out",
  },
  variants: {
    model: {
      cards: {
        link: "after:absolute after:inset-0 after:block after:rounded-3xl after:shadow-card max-xs:after:shadow-card-subtle",
        img: "rounded-3xl",
        textContainer: "overflow-hidden rounded-3xl",
      },
      banner: "",
    },
  },
});

type ContentSliderVariants = VariantProps<typeof contentSliderStyles>;

type ContentSliderProps = ComponentProps<"a"> &
  ContentSliderVariants & {
    data: DiscoverSchemaType["results"][0];
    selected: NonNullable<selectOption>[];
  };

export default function ContentSlider({
  data,
  selected,
  model,
  ...props
}: Readonly<ContentSliderProps>) {
  const { link, figure, img, textContainer, title, overview } =
    contentSliderStyles({ model });
  return (
    <Link
      {...props}
      href={`/movie/${data.id}`}
      className={clsx(link(), props.className)}
    >
      <figure className={figure()}>
        <img
          src={`${BACKDROP.w1280 + data.backdrop_path}`}
          className={img()}
          loading="lazy"
          alt={`Imagem de plano de fundo do filme ${data.title}`}
        />
      </figure>
      <div
        className={clsx(
          textContainer(),
          selected.some((s) => s.id === data.id) && "before:animate-fade",
        )}
      >
        <p
          className={clsx(
            title(),
            selected.some((s) => s.id === data.id) && "animate-fade-left",
          )}
        >
          {data.title}
        </p>
        {data.overview && (
          <p
            className={clsx(
              overview(),
              selected.some((s) => s.id === data.id) && "animate-fade-left",
            )}
          >
            {data.overview}
          </p>
        )}
      </div>
    </Link>
  );
}
