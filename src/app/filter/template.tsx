import { Suspense } from "react";

import FilterMenu from "@/app/filter/components/FilterMenu";
import { QueryProvider } from "@/components/Providers";

type TemplateProps = { children: React.ReactNode };
export const revalidate = 86400;

export default function Template({ children }: Readonly<TemplateProps>) {
  return (
    <Suspense>
      <FilterMenu>
        <QueryProvider>{children}</QueryProvider>
      </FilterMenu>
    </Suspense>
  );
}
