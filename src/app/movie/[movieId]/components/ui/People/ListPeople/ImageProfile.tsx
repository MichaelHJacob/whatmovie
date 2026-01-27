import { PROFILE } from "@/config/imageConfig";

type ImageProfileProps = { path: string; alt: string };

export default function ImageProfile({
  path,
  alt,
}: Readonly<ImageProfileProps>) {
  return (
    <div className="relative after:absolute after:inset-0 after:block after:rounded-full after:shadow-people">
      <img
        srcSet={`${PROFILE.w185 + path} 1x, ${PROFILE.h632 + path} 2x`}
        src={PROFILE.w185 + path}
        alt={alt}
        loading="lazy"
        className="aspect-square w-full rounded-full object-cover contrast-[1.1]"
      />
    </div>
  );
}
