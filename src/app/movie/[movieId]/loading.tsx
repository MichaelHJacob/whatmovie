import CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container>
      <div className="paddingHeader relative z-30 h-min w-full animate-pulse">
        <div className="absolute left-[50%] top-0 z-[-1] h-full w-screen translate-x-[-50%] overflow-hidden">
          <div className="h-full w-full animate-pulse bg-gradient-to-t from-nightDew-400 to-nightDew-300" />
        </div>
        <div className="md:gridTemplateSpace blockContainer items-center xl:grid-cols-[repeat(20,_minmax(0,_1fr))]">
          <div className="relative overflow-visible md:col-span-4 lg:col-span-5">
            <div className="unavailable flex aspect-[18/27] h-full max-h-[75] w-full flex-col items-center justify-between overflow-hidden rounded-lg pb-10 pt-5"></div>
          </div>
          <div className="relative z-40 rounded-lg pt-2 max-md:backdrop-blur-3xl md:col-span-8 lg:col-[span_15_/_span_15]">
            <div className="mb-1 h-11 w-3/4 rounded-lg bg-nightDew-600/40 bg-white" />
            <div className="mb-2 h-5 w-1/2 rounded-lg bg-nightDew-600/40 bg-white" />
            <div className="mb-2 h-5 w-2/12 rounded-lg bg-nightDew-600/40 bg-white" />
          </div>
        </div>
      </div>

      <div>
        <div className="blockContainer-x py-2 xs:py-[1rem] lg:py-6">
          <div className="mb-2 h-6 w-24 rounded-lg bg-nightDew-600/20" />
        </div>

        <div className="ListSpacing animate-pulse items-stretch">
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
