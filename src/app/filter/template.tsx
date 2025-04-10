import Container from "@/components/layout/Container";
import Filter from "@/app/filter/components/Filter";
import MovieCards from "@/components/skeleton/MovieCards";
import { Suspense } from "react";
import NavBar from "@/components/layout/NavBar";

type TemplateProps = {  children: React.ReactNode  };

export default function Template({ children  }: TemplateProps) {
  return (
    <>
      <NavBar fixed />
      <Suspense
        fallback={
          <Container>
            <div className="w-full gridTemplateSpace itens-center blockContainer">
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
