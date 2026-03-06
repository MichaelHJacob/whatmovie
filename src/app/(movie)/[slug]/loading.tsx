import Container from "@/components/layout/Container";
import { movieBase } from "@/styles/movie.styles";
import clsx from "clsx";
import { tv } from "tailwind-variants";

const loadingStyles = tv({
  extend: movieBase,
  slots: {
    base: "animate-pulse rounded-lg bg-neutral-500/30",
  },
});

export default function Loading() {
  const {
    container,
    innerContainer,
    raised,
    imgContainer,
    img,
    imgUnavailable,
    descriptionContainer,
    base,
  } = loadingStyles();

  return (
    <div className="min-h-screen">
      <Container
        className={clsx(container(), raised(), "bg-gradient-default")}
        innerStyles={innerContainer()}
      >
        <div className={clsx(imgContainer(), "animate-pulse")}>
          <div className={clsx(img(), imgUnavailable(), "opacity-30")} />
        </div>
        <div className={clsx(descriptionContainer(), "pb-11")}>
          <div>
            <div className={clsx(base(), "mb-2 h-10 w-3/4")} />
            <div className={clsx(base(), "my-1 h-5 w-1/2")} />
          </div>
          <div className={clsx(base(), "my-1 h-20 w-full")} />
          <div className={clsx(base(), "my-3 h-7 w-40")} />
        </div>
      </Container>
    </div>
  );
}
