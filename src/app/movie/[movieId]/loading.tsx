import CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container>
      <div className="paddingHeader relative z-30 h-min w-full animate-pulse">
        <div className="absolute left-[50%] top-0 z-[-1] h-full w-screen translate-x-[-50%] overflow-hidden">
          <div className="h-full w-full animate-pulse bg-neutral-500" />
        </div>
        <div className="md:gridTemplateSpace blockContainer-p items-center xl:grid-cols-[repeat(20,_minmax(0,_1fr))]">
          <div className="relative overflow-visible md:col-span-4 lg:col-span-5">
            <div className="unavailable flex aspect-[18/27] h-full max-h-[75] w-full flex-col items-center justify-between overflow-hidden rounded-lg pb-10 pt-5"></div>
          </div>
          <div className="relative z-40 rounded-lg pt-2 max-md:backdrop-blur-3xl md:col-span-8 lg:col-[span_15_/_span_15]">
            <div className="mb-1 h-11 w-3/4 rounded-lg bg-white/90" />
            <div className="mb-2 h-5 w-1/2 rounded-lg bg-white/90" />
            <div className="mb-2 h-5 w-2/12 rounded-lg bg-white/90" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black">
        <div className="blockContainer-px py-2 xs:py-[1rem] lg:py-6">
          <div className="mb-2 h-6 w-24 rounded-lg bg-black/30 dark:bg-white/30" />
        </div>

        <div className="listSpacing animate-pulse items-stretch">
          <CardInformation>
            <div className="aspect-square h-full w-full"></div>
          </CardInformation>
          <CardInformation>
            <div className="aspect-square h-full w-full"></div>
          </CardInformation>
          <CardInformation>
            <div className="aspect-square h-full w-full"></div>
          </CardInformation>
        </div>
      </div>
    </Container>
  );
}
