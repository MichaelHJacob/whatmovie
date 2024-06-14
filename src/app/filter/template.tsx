import { Container } from "@/components/frame";
import FilterSideMenu from "@/app/filter/compsClient";
import { LoadingCards } from "@/components/frame";
import { Suspense } from "react";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <Container>
            <div className="w-full gridTemplateSpace itens-center blockContainer">
              <LoadingCards />
            </div>
        </Container>
      }
    >
      <FilterSideMenu>{children}</FilterSideMenu>
    </Suspense>
  );
}
