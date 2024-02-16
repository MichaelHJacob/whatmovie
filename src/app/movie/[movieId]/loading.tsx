import {
  BlockContainer,
  CardInformation,
  Container,
  SubTitle,
} from "@/components/comps";

export default function Loading() {
  return (
    <Container>
      <div className="h-min w-full relative paddingHeader z-30">
        <div className="w-screen left-[50%] translate-x-[-50%]  h-full absolute top-0  z-[-1] overflow-hidden">
          <div className="  w-full h-full   bg-onBackground1/30 animate-pulse   blur-3xl transform scale-125 " />
        </div>
        <BlockContainer>
          <div className="md:gridTemplateSpace  ">
            <div className="relative  md:col-span-4 lg:col-span-5 overflow-visible">
              <div className="rounded-lg flex flex-col justify-between items-center pb-10 pt-5  w-full h-full overflow-hidden bg-gradient-to-b from-solid-pink-950/5 to-neutral-500/15   shadow-xl shadow-black/10 aspect-[18/27]"></div>
            </div>
            <div className="relative  z-40 md:col-span-8 lg:col-[span_15_/_span_15] max-md:bg-gray-950/50 max-md:backdrop-blur-3xl rounded-lg p-4 pt-2 animate-pulse ">
              <div className="h-11 w-3/4   max-md:bg-white/30 rounded-lg mb-1 bg-black/20" />
              <div className="h-5 w-1/2    max-md:bg-white/30 rounded-lg mb-2 bg-black/20" />
              <div className="h-5 w-2/12   max-md:bg-white/30 rounded-lg mb-2 bg-black/20" />
              <div className="h-1/2 w-full max-md:bg-white/30 rounded-lg bg-black/10" />
            </div>
          </div>
        </BlockContainer>
      </div>

      <BlockContainer>
        <div className="py-2 xs:py-[1rem] lg:py-6">
          <div className="h-6 w-40 rounded-lg mb-2 bg-black/20" />
        </div>

        <div className="ListSpacing animate-pulse">
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
      </BlockContainer>
    </Container>
  );
}
