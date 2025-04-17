import { PROFILE } from "@/config/imageConfig";

type ImageProfileProps = { path: string; alt: string };

export default function ImageProfile({ path, alt }: ImageProfileProps) {
  return (
    <img
      srcSet={`${PROFILE.w185 + path} 1x, ${PROFILE.h632 + path} 2x`}
      src={`${PROFILE.w185 + path}`}
      alt={alt}
      loading="lazy"
      className="light-shadow aspect-square w-full rounded-full object-cover contrast-[1.1]"
    />
  );
}
