import  CardInformation from "@/app/movie/[movieId]/components/ui/CardInformation";
import Container from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container>
    <div className="h-min w-full relative paddingHeader z-30 animate-pulse">
      <div className="w-screen left-[50%] translate-x-[-50%]  h-full absolute top-0  z-[-1] overflow-hidden">
        <div className="  w-full h-full   animate-pulse   bg-gradient-to-t from-nightDew-400 to-nightDew-300" />
      </div>
        <div className="md:gridTemplateSpace xl:grid-cols-[repeat(20,_minmax(0,_1fr))] items-center blockContainer">
          <div className="relative  md:col-span-4 lg:col-span-5 overflow-visible">
            <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden unavailable aspect-[18/27] max-h-[75]"></div>
          </div>
          <div className="relative  z-40 md:col-span-8 lg:col-[span_15_/_span_15] max-md:backdrop-blur-3xl rounded-lg pt-2 ">
            <div className="h-11 w-3/4   bg-white rounded-lg mb-1 bg-nightDew-600/40" />
            <div className="h-5 w-1/2    bg-white rounded-lg mb-2 bg-nightDew-600/40" />
            <div className="h-5 w-2/12   bg-white rounded-lg mb-2 bg-nightDew-600/40" />
          </div>
        </div>
    </div>

    <div>
      <div className="py-2 xs:py-[1rem] lg:py-6 blockContainer-x">
        <div className="h-6 w-24 rounded-lg mb-2 bg-nightDew-600/20" />
      </div>

      <div className="ListSpacing animate-pulse items-stretch  ">
        <CardInformation>
          <div className="h-full w-full  aspect-square"></div>
        </CardInformation>
        <CardInformation>
          <div className="h-full w-full  aspect-square"></div>
        </CardInformation>
        <CardInformation>
          <div className="h-full w-full  aspect-square"></div>
        </CardInformation>
      </div>
    </div>
  </Container>
  );
}
