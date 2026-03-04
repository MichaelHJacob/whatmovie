import Stream from "@/app/movie/[movieId]/components/layout/PageHero/Stream";
import Container from "@/components/layout/Container";
import HTitle from "@/components/ui/HTitle";
import { POSTER } from "@/config/imageConfig";
import { generateBlurImage } from "@/lib/image/generateBlurImage";
import { formatToLocaleDate } from "@/lib/utils/formatToLocaleDate";
import { MovieDetailsType } from "@/lib/validation/movieDetailsSchema";
import { movieBase } from "@/styles/movie.styles";
import clsx from "clsx";
import { tv } from "tailwind-variants";

type PageHeroProps = {
  data: MovieDetailsType;
};

const movieStyles = tv({
  extend: movieBase,
  slots: {
    textImgUnavailable: "textBtn w-full text-wrap text-center",
    title: "px-1 text-4xl font-bold text-base-heading",
    text: "data font-semibold text-base-medium",
    subTitle: "w-full px-1 py-2 text-base-strong xs:py-4 md:py-2 lg:py-3",
  },
});

export default async function PageHero({ data }: Readonly<PageHeroProps>) {
  const {
    container,
    innerContainer,
    raised,
    imgContainer,
    img,
    imgUnavailable,
    textImgUnavailable,
    descriptionContainer,
    title,
    text,
    subTitle,
  } = movieStyles();

  const [base64] = data?.poster_path
    ? await generateBlurImage(POSTER.w92 + data.poster_path)
    : [null];

  return (
    <Container
      style={{
        backgroundImage: base64 ? `url("${base64}")` : undefined,
      }}
      className={clsx(container(), raised(), !base64 && "bg-gradient-default")}
      innerStyles={innerContainer()}
    >
      <div className={imgContainer()}>
        {data.poster_path ? (
          <img
            srcSet={`${POSTER.w342}${data.poster_path} 342w, ${POSTER.w500}${data.poster_path} 500w, ${POSTER.original}${data.poster_path} 780w`}
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 500px, 780px"
            src={POSTER.original + data.poster_path}
            alt={data.original_title}
            className={clsx(
              img(),
              "aspect-[2/3_auto] animate-fade animate-ease-out",
            )}
          />
        ) : (
          <div className={clsx(img(), imgUnavailable())}>
            <p className={clsx(textImgUnavailable(), "text-base-dimmed")}>
              imagem indisponível
            </p>
            <p
              className={clsx(
                textImgUnavailable(),
                "px-3 text-lg text-base-minimal",
              )}
            >
              {data.title}
            </p>
          </div>
        )}
      </div>

      <div className={descriptionContainer()}>
        <header>
          <HTitle as="h1" container={false} className={title()}>
            {data.title}
          </HTitle>

          <p className={text()}>
            {data.release_date &&
              formatToLocaleDate(data.release_date, "short")}
            {data.genres && (
              <>
                {" - "}
                {data.genres.map((value) => value.name).join(", ")}
              </>
            )}
          </p>
        </header>

        {data.overview && (
          <p className={text()}>
            <strong className="hidden">Sinopse:</strong>
            {data.overview}
          </p>
        )}

        {data["watch/providers"]?.results?.BR && (
          <Stream
            provider={data["watch/providers"].results.BR}
            title={subTitle()}
            text={text()}
          />
        )}
      </div>
    </Container>
  );
}
