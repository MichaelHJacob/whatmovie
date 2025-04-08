import config from "@/components/utils/config";

type ImageProfileProps = { path: string; alt: string };

export default function ImageProfile({ path, alt }: ImageProfileProps) {
    return (
      <img
        srcSet={`${config.imgUrlS02}${path}, https://image.tmdb.org/t/p/h632${path} 2x`}
        src={`${config.imgUrlS02}${path}`}
        alt={alt}
        loading="lazy"
        className="rounded-full w-full aspect-square object-cover light-shadow contrast-[1.1]"
      />
    );
  }