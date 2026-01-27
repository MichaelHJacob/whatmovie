import CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import { getMovieTranslations } from "@/lib/api/tmdb/use-cases/getMovieTranslations";

type TranslationsProps = {
  movieId: string;
};

export default async function Translations({
  movieId,
}: Readonly<TranslationsProps>) {
  const [data] = await getMovieTranslations({ id: movieId });

  if (!data) return null;

  return (
    <div className="blockContainer-p">
      <CardInformation>
        <dt className="label mb-1">Traduções:</dt>
        <dd>
          <ul className="mb-2 grid w-full grid-cols-2 xs:grid-cols-3 sm:grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))]">
            {data.translations.map((value) => {
              return (
                <li className="data col-span-1 row-span-1" key={value.name}>
                  {value.name + "-" + value.iso_3166_1}
                </li>
              );
            })}
          </ul>
        </dd>
      </CardInformation>
    </div>
  );
}
