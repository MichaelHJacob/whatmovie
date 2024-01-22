import { BlockContainer } from "@/components/comps";
import { FilterSideMenu } from "@/components/filters";
import { Suspense } from "react";

function LoadingCards() {
  const skeleton = [];

  for (let i = 0; i <= 20; i++) {
    skeleton.push(
      <div
        className="col-span-5 xs:col-span-5 md:col-span-3 lg:col-span-4 xl:col-span-3 2xl:col-span-4"
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
    <FilterSideMenu>
      <Suspense
        fallback={
          <BlockContainer>
            <div className=" w-full  gridTemplateSpace  ">
              <LoadingCards />
            </div>
          </BlockContainer>
        }
      >
        {children}
      </Suspense>
    </FilterSideMenu>
  );
}
