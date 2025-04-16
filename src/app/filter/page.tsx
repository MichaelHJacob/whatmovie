import fetchMovies from "@/app/filter/actions";
import MovieCardsScroll from "@/app/filter/components/MovieCardsScroll";
import LabelH4 from "@/components/ui/LabelH4";
import { CardMovieType } from "@/types/globalTypes";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const data: CardMovieType = await fetchMovies(searchParams);

  return (
    <>
      <div>
        {data?.results.length > 0 && (
          <ul
            key={Math.random()}
            className="gridTemplateSpace blockContainer relative w-full items-end xl:gap-[var(--gapMD)] 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:gap-[var(--gapLG)]"
          >
            <MovieCardsScroll
              initialData={data}
              totalPages={data.total_pages}
              parameters={searchParams}
            />
          </ul>
        )}
      </div>

      {data?.results.length < 20 && data?.total_pages === 1 && (
        <div className="blockContainer flex justify-end">
          {data?.results.length == 0 ? (
            <LabelH4>
              Considere um filtro mais amplo para exibir resultados
            </LabelH4>
          ) : (
            <LabelH4>
              Considere um filtro mais amplo para exibir mais resultados
            </LabelH4>
          )}
        </div>
      )}
    </>
  );
}
