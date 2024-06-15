"use client";
import { useState } from "react";
import { Break } from "@/components/frame";
import { LabelH4, SubTitle } from "@/components/comps";
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
        <div className="md:blockContainer-x">
          <iframe
            className="w-full aspect-video bg-black md:rounded-2xl overflow-hidden mid-shadow"
            allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameBorder="0"
          ></iframe>
        </div>
    );
  }

  return (
    <>
      <div className="max-md:bg-black">
        <SubTitle>
          <span className="max-md:text-Background">
            Videos, Trailers e mais
          </span>
        </SubTitle>
        <VideoDisplay video={selected} />
        <details
          id="detailsVideos"
          className="w-full relative h-min blockContainer-b group"
        >
          <summary
            id="summary"
            className="w-full h-min justify-between items-center flex relative z-30 blockContainer-x"
            onClick={(e) => e.preventDefault()}
          >
            <LabelH4>
              <span className="max-md:text-white">{selected.name}</span>
            </LabelH4>
            <button
              onClick={() => {
                let dVideos = document.getElementById("detailsVideos");
                dVideos?.hasAttribute("open")
                  ? dVideos.removeAttribute("open")
                  : dVideos?.setAttribute("open", "open");
              }}
              className={`main-backBtn max-md:bg-onBackground2/30 ${
                videosArray.length <= 1 && "hidden"
              }`}
            >
              <span className="main-TextBtn max-md:text-white">
                Mais videos
              </span>
              <span className="w-[12px] h-[12px] group-open:rotate-[270deg] bg-[url('/toRight.svg')] bg-[length:12px_12px] bg-[center_center] bg-no-repeat transition-all duration-300"></span>
            </button>
          </summary>
          <ListControl id={"videos"} length={videosArray.length} >
            <ul
              id="videos"
              className="max-md:flex max-md:flex-col max-xs:gap-[var(--gap)] max-md:gap-[var(--gapXS)] md:ListSpacing md:spacingShrinkerBlock-b max-md:blockContainer-x list-none no-scrollbar relative max-md:animate-showVideoV md:animate-showVideoH"
            >
              {videosArray.map((value, index) => (
                <li
                  id={`videos${index}`}
                  className={`w-full max-md:flex box-content relative snap-start snap-always cursor-pointer   overflow-visible items-center  justify-start md:gridColSpanMovie transform-gpu transition-all duration-300 md:pt-[var(--gapMD)] lg:pt-[var(--gapLG)    ${
                    selected == value &&
                    "max-md:bg-onBackground2/30  max-xs:py-[calc(var(--gap)/3)] max-xs:pl-[calc(var(--gap)/3)] max-xs:my-[calc((var(--gap)/3)*-1)] max-xs:ml-[calc((var(--gap)/3)*-1)]  max-md:py-[calc(var(--gapXS)/3)] max-md:pl-[calc(var(--gapXS)/3)] max-md:my-[calc((var(--gapXS)/3)*-1)] max-md:ml-[calc((var(--gapXS)/3)*-1)] rounded-xl md:scale-105"
                  }`}
                  onClick={() => setSelected(value)}
                  key={index}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${value.key}/hqdefault.jpg`}
                    className={`object-cover bg-center max-md:w-20 md:w-full aspect-[16/9]  rounded-lg transition-all duration-300  md:shadow-[0_10px_50px_-12px] ${
                      selected == value
                        ? "md:shadow-onBackground1  "
                        : "md:shadow-transparent"
                    }`}
                  />
                  <div className="w-full  px-[calc(var(--p)/2)] xs:px-[calc(var(--pXS)/2)] md:px-0">
                    <h4
                      className={`data max-md:text-white/70 line-clamp-2 antialiased   ${
                        selected == value && "text-black  max-md:font-semibold"
                      }`}
                    >
                      {value.name}
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
          </ListControl>
        </details>
      </div>
      <Break />
    </>
  );
}
