import { BlockContainer } from "@/components/frame";
import { SubTitle } from "@/components/comps";
import { DiscoverType } from "@/components/utils/types";
import { fetchMovies } from "./actions";
import { ScrollPages } from "./compsClient";
import { MapCardMovie } from "./comps";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data: DiscoverType = await fetchMovies(searchParams);

  return (
    <>
      {data.total_pages}
      <BlockContainer>
        {data?.results.length > 0 && (
          <ul
            key={Math.random()}
            className=" w-full  gridTemplateSpace  xl:grid-cols-12 2xl:grid-cols-[repeat(20,_minmax(0,_1fr))] xl:gap-[var(--gapMD)] 2xl:gap-[var(--gapLG)] relative"
          >
            <MapCardMovie data={data?.results} />
            <ScrollPages
              totalPages={data.total_pages}
              parameters={searchParams}
            />
          </ul>
        )}
      </BlockContainer>

      <BlockContainer>
        {data?.results.length < 20 && data?.total_pages === 1 && (
          <div className="flex justify-end">
            {data?.results.length == 0 ? (
              <SubTitle>
                Considere um filtro mais amplo para exibir resultados
              </SubTitle>
            ) : (
              <SubTitle>
                Considere um filtro mais amplo para exibir mais resultados
              </SubTitle>
            )}
          </div>
        )} 
      </BlockContainer>
    </>
  );
}
