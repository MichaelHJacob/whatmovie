import LabelH4 from "@/components/ui/LabelH4";
import { CardMovieType } from "@/components/utils/types";
import fetchMovies from "@/app/filter/actions";
import MovieCardsScroll from "@/app/filter/components/MovieCardsScroll";

type PageProps = { searchParams: { [key: string]: string | string[] | undefined };
 };

export default async function Page({ searchParams } : PageProps ){
  const data: CardMovieType = await fetchMovies(searchParams);

  return (
    <>
      <div>
        {data?.results.length > 0 && (
          <ul
            key={Math.random()}
            className=" w-full  gridTemplateSpace items-end 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] xl:gap-[var(--gapMD)] 2xl:gap-[var(--gapLG)] relative blockContainer"
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
        <div className="flex justify-end blockContainer">
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
