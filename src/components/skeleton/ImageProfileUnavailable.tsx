import clsx from "clsx";
import { VariantProps, tv } from "tailwind-variants";

//
const imageProfileUnavailable = tv({
  slots: {
    container:
      "bg-gradient-default relative aspect-square overflow-hidden rounded-full after:absolute after:inset-0 after:block after:rounded-full after:shadow-people",
    text: "textBtn absolute w-min translate-x-[-50%] text-wrap text-center",
  },
  variants: {
    mode: {
      list: {
        container: "h-full min-w-max",
      },
      icon: {
        container: "w-full",
      },
    },
  },
  defaultVariants: {
    mode: "icon",
  },
});

type ImageProfileUnavailableProps = { alt: string } & VariantProps<
  typeof imageProfileUnavailable
>;

export default function ImageProfileUnavailable({
  alt,
  mode,
}: Readonly<ImageProfileUnavailableProps>) {
  const { container, text } = imageProfileUnavailable({ mode });
  return (
    <div className={container()}>
      <p
        className={clsx(
          text(),
          "bottom-1 left-[50%] top-[10%] text-xs text-inverted-strong text-opacity-30",
        )}
      >
        imagem indisponível
      </p>
      <p className={clsx(text(), "bottom-[15%] left-[50%] h-min w-[50%]")}>
        <span className="line-clamp-1 h-auto text-inverted-medium text-opacity-90">
          {alt}
        </span>
      </p>
    </div>
  );
}
