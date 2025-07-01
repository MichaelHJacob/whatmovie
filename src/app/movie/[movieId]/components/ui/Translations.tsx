import { getMovieTranslations } from "@/lib/api/tmdb/getMovieTranslations";

type TranslationsProps = {
  movieId: string;
};

export default async function Translations({ movieId }: TranslationsProps) {
  const [data] = await getMovieTranslations(movieId);

  if (!data) return null;

  return (
    <>
      <dt className="label mb-1">Traduções:</dt>
      <dd className="data mb-2">
        <>
          {data.translations
            .map((value) => value.name + "-" + value.iso_3166_1)
            .join(", ")}
        </>
      </dd>
    </>
  );
}
