import { Suspense } from "react";

import FilterMenu from "@/app/filter/components/FilterMenu";
import { QueryProvider } from "@/components/Providers";
import { getMovieProviders } from "@/lib/api/tmdb/use-cases/getMovieProviders";

type TemplateProps = { children: React.ReactNode };
export const revalidate = 86400;

export default async function Template({ children }: Readonly<TemplateProps>) {
  const [listProviders] = await getMovieProviders({});
  return (
    <Suspense>
      <FilterMenu listProviders={listProviders}>
        <QueryProvider>{children}</QueryProvider>
      </FilterMenu>
    </Suspense>
  );
}
