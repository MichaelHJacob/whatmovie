import { Container } from "@/components/frame";
import FilterSideMenu from "@/app/filter/compsClient";
import { MovieCards } from "@/components/frame";
import { Suspense } from "react";
import { NavBar } from "@/components/comps";

export default function Template({ children }: { children: React.ReactNode }) {
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
        <FilterSideMenu>{children}</FilterSideMenu>
      </Suspense>
    </>
  );
}
