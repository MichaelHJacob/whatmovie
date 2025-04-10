import { Suspense } from "react";

import Filter from "@/app/filter/components/Filter";
import Container from "@/components/layout/Container";
import NavBar from "@/components/layout/NavBar";
import MovieCards from "@/components/skeleton/MovieCards";

type TemplateProps = { children: React.ReactNode };

export default function Template({ children }: TemplateProps) {
  return (
    <>
      <NavBar fixed />
      <Suspense
        fallback={
          <Container>
            <div className="gridTemplateSpace itens-center blockContainer w-full">
              <MovieCards id="filter" size={20} />
            </div>
          </Container>
        }
      >
        <Filter>{children}</Filter>
      </Suspense>
    </>
  );
}
