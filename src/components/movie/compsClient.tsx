"use client";
import { useState } from "react";
import { BlockContainer, Break} from "@/components/frame";
import { SubTitle} from "@/components/comps";
import { VideosResultsType } from "@/components/utils/types";
import { ListControl } from "../client/comps";

export default function Videos({
  videosArray,
}: {
  videosArray: VideosResultsType[];
}) {
  const [selected, setSelected] = useState(videosArray[0]);

  function VideoDisplay({ video }: { video: VideosResultsType }) {
    return (
      <div className="h-min ">
        <div className="max-md:spacingShrinkerBlock-x bg-black rounded-2xl overflow-hidden">
          <iframe
            className="w-full aspect-video "
            allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameBorder="0"
          ></iframe>
        </div>
        <SubTitle>
          <span className="line-clamp-2 max-md:line-clamp-1 max-md:text-white mr-32" >{video.name}</span>
        </SubTitle>
      </div>
    );
  }

  return (
    <>
      <div className="max-md:bg-black">
        <BlockContainer>
          <SubTitle>
            <span className="max-md:text-Background ">
              Videos, Trailers e mais
            </span>
          </SubTitle>
          <VideoDisplay video={selected} />

          <details
            open
            className={`w-full relative h-min group ${
              videosArray.length <= 1 && "hidden"
            }`}
          >
            <summary id="summary"
              className="absolute  h-11 w-fit top-[-2.75rem] xs:top-[calc(-2.75rem-0.25rem)] lg:top-[calc(-2.75rem-0.75rem)] right-0  main-TextBtn main-backBtn shadow-none max-md:bg-onBackground1/40 max-md:text-Background/70 
              "
            >
              <span className="">Mais videos</span>
              <span className=" w-[12px] h-[12px] group-open:rotate-[270deg] bg-[url('/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat transition-all duration-300 "></span>
            </summary>
            <ListControl id={"videos"} length={videosArray.length}>
            <ul id="videos"
              className="max-md:flex max-md:flex-col max-xs:gap-[var(--gap)] max-md:gap-[var(--gapXS)] pt-[var(--gap)] xs:pt-[var(--gapXS)] md:pt-[var(--gapMD)] lg:pt-[var(--gapLG) 
                md:ListSpacing list-none no-scrollbar relative 
               "
            >
              {videosArray.map((value, index) => (
                <li id={`videos${index}`}
                  className={`w-full max-md:flex box-content relative snap-start snap-always cursor-pointer   overflow-visible items-center  justify-start md:gridColSpanMovie transform-gpu transition-all duration-300  ${
                    selected == value &&
                    "max-md:bg-onBackground1/40  max-xs:py-[calc(var(--gap)/2)] max-xs:pl-[calc(var(--gap)/2)] max-xs:my-[calc((var(--gap)/2)*-1)] max-xs:ml-[calc((var(--gap)/2)*-1)]  max-md:py-[calc(var(--gapXS)/2)] max-md:pl-[calc(var(--gapXS)/2)] max-md:my-[calc((var(--gapXS)/2)*-1)] max-md:ml-[calc((var(--gapXS)/2)*-1)] rounded-xl md:scale-105 "
                  }`}
                  onClick={() => setSelected(value)}
                  key={index}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${value.key}/hqdefault.jpg`}
                    className={`object-cover bg-center max-md:w-20 md:w-full aspect-[16/9]  rounded-lg transition-all duration-300  md:shadow-[0_10px_50px_-12px] ${selected == value? "md:shadow-onBackground1  ": "md:shadow-transparent"}`}/>
                  <div className="w-full  px-[calc(var(--p)/2)] xs:px-[calc(var(--pXS)/2)] md:px-0">
                    <h4
                      className={`data max-md:text-white/70 line-clamp-2 antialiased   ${selected == value && "text-black  max-md:font-semibold"}`}>
                      {value.name}
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
            </ListControl>
          </details>
        </BlockContainer>
      </div>
      <Break />
    </>
  );
}
