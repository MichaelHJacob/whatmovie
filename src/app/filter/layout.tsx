import { BlockContainer, Container } from "@/components/frame";
import FilterSideMenu from "@/app/filter/compsClient";
import { LoadingCards } from "@/components/frame";
import { Suspense } from "react";



export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <Container>
          <BlockContainer>
            <div className=" w-full  gridTemplateSpace  ">
              <LoadingCards />
            </div>
          </BlockContainer>
        </Container>
      }
    >
      <FilterSideMenu>{children}</FilterSideMenu>
    </Suspense>
  );
}
