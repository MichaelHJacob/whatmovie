"use client";

import { useTmdbConfigContext } from "@/components/providers/TmdbConfigProvider";
import { VariantProps, tv } from "tailwind-variants";

const imageProfileStyles = tv({
  slots: {
    imgContainer: "relative",
    img: "aspect-square rounded-full object-cover contrast-[1.1]",
  },
  variants: {
    mode: {
      list: {
        imgContainer: "aspect-square h-full",
        img: "h-full",
      },
      icon: {
        imgContainer:
          "w-full after:absolute after:inset-0 after:block after:rounded-full after:shadow-people",
        img: "w-full",
      },
    },
  },
  defaultVariants: {
    mode: "icon",
  },
});

type ImageProfileProps = {
  path: string;
  alt: string;
} & VariantProps<typeof imageProfileStyles>;

export default function ImageProfile({
  path,
  alt,
  mode,
}: Readonly<ImageProfileProps>) {
  const { imgContainer, img } = imageProfileStyles({ mode });
  const baseUrl = useTmdbConfigContext();
  return (
    <div className={imgContainer()}>
      <img
        srcSet={`${baseUrl.profile.p200 + path} 1x, ${baseUrl.profile.f600 + path} 2x`}
        src={baseUrl.profile.p200 + path}
        alt={alt}
        fetchPriority="low"
        loading="lazy"
        className={img()}
      />
    </div>
  );
}
