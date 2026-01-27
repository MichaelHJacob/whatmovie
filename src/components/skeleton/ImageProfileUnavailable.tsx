type ImageProfileUnavailableProps = { alt: string };

export default function ImageProfileUnavailable({
  alt,
}: Readonly<ImageProfileUnavailableProps>) {
  return (
    <div className="unavailable relative aspect-square rounded-full after:absolute after:inset-0 after:block after:rounded-full after:shadow-people">
      <p className="textBtn absolute bottom-1 left-[50%] top-[10%] w-min translate-x-[-50%] text-wrap text-center text-xs text-inverted-strong text-opacity-30">
        imagem indisponível
      </p>
      <p className="absolute bottom-[15%] left-[50%] h-min w-[50%] translate-x-[-50%] overflow-hidden">
        <span className="textBtn line-clamp-1 h-auto overflow-hidden text-wrap text-center text-inverted-medium text-opacity-90">
          {alt}
        </span>
      </p>
    </div>
  );
}
