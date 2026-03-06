import CardInformation from "@/app/(movie)/[slug]/components/layout/Details/CardInformation";
import { getMovieTranslations } from "@/lib/api/tmdb/use-cases/getMovieTranslations";
import { tv } from "tailwind-variants";

type TranslationsProps = {
  movieId: string;
};

const translationsStyles = tv({
  slots: {
    ul: "mb-2 grid w-full grid-cols-2 xs:grid-cols-3 sm:grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))]",
    li: "data col-span-1 row-span-1",
  },
});

export default async function Translations({
  movieId,
}: Readonly<TranslationsProps>) {
  const [data] = await getMovieTranslations({ id: movieId });
  if (!data) return null;
  const { ul, li } = translationsStyles();

  return (
    <div className="blockContainer-p">
      <CardInformation>
        <dt className="label mb-1">Traduções:</dt>
        <dd>
          <ul className={ul()}>
            {data.translations.map((value) => {
              return (
                <li className={li()} key={value.name}>
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
