import { Container } from "@/components/frame";
import FilterSideMenu from "@/app/filter/compsClient";
import { LoadingCards } from "@/components/frame";
import { Suspense } from "react";
import { NavBar } from "@/components/comps";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <NavBar fixed/>
    <FilterSideMenu>
    <Suspense
      fallback={
        <Container>
            <div className="w-full gridTemplateSpace itens-center blockContainer">
              <LoadingCards />
            </div>
        </Container>
      }
    >
      {children}
    </Suspense>
    </FilterSideMenu>
    </>
  );
}
