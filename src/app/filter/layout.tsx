import { BlockContainer, Container } from "@/components/frame";
import FilterSideMenu from "@/components/filter/compsClient";
import { Suspense } from "react";

function LoadingCards() {
  const skeleton = [];

  for (let i = 0; i <= 20; i++) {
    skeleton.push(
      <div
        className="gridColSpanMovie"
        key={i}
      >
        <div className="w-full aspect-[18/27] bg-onSurface2/10 animate-pulse rounded-lg shadow-xl shadow-black/30"></div>
      </div>
    );
  }

  return skeleton;
}

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
