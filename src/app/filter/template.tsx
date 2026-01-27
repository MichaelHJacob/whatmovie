import { Suspense } from "react";

import FilterMenu from "@/app/filter/components/FilterMenu";
import { QueryProvider } from "@/components/Providers";
import NavBar from "@/components/layout/NavBar";

type TemplateProps = { children: React.ReactNode };

export default function Template({ children }: Readonly<TemplateProps>) {
  return (
    <>
      <NavBar fixed />
      <Suspense>
        <FilterMenu>
          <QueryProvider>{children}</QueryProvider>
        </FilterMenu>
      </Suspense>
    </>
  );
}
