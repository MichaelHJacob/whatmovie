import { Suspense } from "react";

import FilterMenu from "@/app/filter/components/FilterMenu";
import { QueryProvider } from "@/components/Providers";
import TmdbConfigProvider from "@/components/providers/TmdbConfigProvider";
import { getMovieProviders } from "@/lib/api/tmdb/use-cases/getMovieProviders";
import { imgBaseUrl } from "@/lib/utils/getImageBaseUrl";

type TemplateProps = { children: React.ReactNode };
export const revalidate = 86400;

export default async function Template({ children }: Readonly<TemplateProps>) {
  const [listProviders] = await getMovieProviders({});

  return (
    <Suspense>
      <TmdbConfigProvider config={imgBaseUrl}>
        <FilterMenu listProviders={listProviders}>
          <QueryProvider>{children}</QueryProvider>
        </FilterMenu>
      </TmdbConfigProvider>
    </Suspense>
  );
}
