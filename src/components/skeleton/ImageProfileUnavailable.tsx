type ImageProfileUnavailableProps = { alt: string };

export default function ImageProfileUnavailable({
  alt,
}: ImageProfileUnavailableProps) {
  return (
    <div className="unavailable light-shadow relative aspect-square overflow-hidden rounded-full">
      <p className="textBtn absolute bottom-1 left-[50%] top-[10%] w-min translate-x-[-50%] text-wrap text-center text-xs text-opacity-30">
        imagem indisponível
      </p>
      <span className="absolute bottom-[15%] left-[50%] h-min w-[50%] translate-x-[-50%] overflow-hidden">
        <p className="textBtn line-clamp-1 h-auto overflow-hidden text-wrap text-center text-opacity-90">
          {alt}
        </p>
      </span>
    </div>
  );
}
