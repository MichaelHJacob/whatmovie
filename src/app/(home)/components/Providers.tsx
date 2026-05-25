import WhatMovieText from "@/assets/logos/whatmovie-text.svg";
import Container from "@/components/layout/Container";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const providersStyle = tv({
  slots: {
    inner:
      "blockContainer-px max-md:blockContainer-py flex animate-fade-up flex-col items-center justify-center md:h-28 md:flex-row",
    picture:
      "absolute left-[3.75rem] top-0 -m-5 box-content aspect-square h-full animate-slide-up p-5 drop-shadow-appIcon animate-fill-both md:left-14",
    textLogo:
      "my-auto h-full w-40 animate-wmSlide-up fill-base-accent animate-fill-both max-md:mx-auto",
    img: "aspect-square h-14 md:h-16",
    textP:
      "text-center text-lg font-bold leading-5 tracking-normal text-base-strong antialiased",
  },
});

export default function Providers() {
  const { inner, picture, img, textLogo, textP } = providersStyle();

  const providers = [
    "Netflix",
    "Disney Plus",
    "Paramount Plus",
    "HBO Max",
    "Amazon Prime Video",
  ];

  return (
    <Container
      as="section"
      className="bg-base-ghost"
      innerStyles={clsx(inner(), "animate-delay-[800ms]")}
    >
      <div className="relative h-14 w-44 max-md:mb-4 max-md:mt-1 md:h-16">
        <WhatMovieText className={clsx(textLogo(), "animate-delay-[1.8s]")} />
        {providers.map((name, i) => {
          return (
            <picture
              key={name}
              style={{ animationDelay: `${i + 2.8}s` }}
              className={picture()}
            >
              <source
                srcSet={`images/providers/${name.toLocaleLowerCase().replace(/\s+/g, "")}_small_2x.webp`}
                media="(max-width: 768px)"
                type="image/webp"
              />
              <source
                srcSet={`/images/providers/${name.toLocaleLowerCase().replace(/\s+/g, "")}_medium.webp 1x, /images/providers/${name.toLocaleLowerCase().replace(/\s+/g, "")}_medium_2x.webp 2x`}
                media="(min-width: 768px)"
                type="image/webp"
              />
              <img
                className={img()}
                src={`/images/providers/${name.toLocaleLowerCase().replace(/\s+/g, "")}_medium.png`}
                fetchPriority="high"
                loading="eager"
                alt={`${name} logo`}
              />
            </picture>
          );
        })}
      </div>
      <div className="mt-[9px] max-md:mb-7">
        <p className={textP()}>Seu streaming favorito em um só lugar.</p>
      </div>
    </Container>
  );
}
