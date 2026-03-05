import { PROFILE } from "@/config/imageConfig";
import { tv } from "tailwind-variants";

const imageProfileStyles = tv({
  slots: {
    imgContainer:
      "relative after:absolute after:inset-0 after:block after:rounded-full after:shadow-people",
    img: "aspect-square w-full rounded-full object-cover contrast-[1.1]",
  },
});

type ImageProfileProps = { path: string; alt: string };

export default function ImageProfile({
  path,
  alt,
}: Readonly<ImageProfileProps>) {
  const { imgContainer, img } = imageProfileStyles();
  return (
    <div className={imgContainer()}>
      <img
        srcSet={`${PROFILE.w185 + path} 1x, ${PROFILE.h632 + path} 2x`}
        src={PROFILE.w185 + path}
        alt={alt}
        loading="lazy"
        className={img()}
      />
    </div>
  );
}
