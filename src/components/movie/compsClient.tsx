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
          <span className="max-md:text-nightDew-200">
            Videos, Trailers e mais
          </span>
        </SubTitle>
        <VideoDisplay video={selected} />
        <details
          id="detailsVideos"
          className="w-full relative h-min blockContainer-b group "
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
              className={`backBtn max-md:bg-opacity-10 max-md:shadow-none ${
                videosArray.length <= 1 && "hidden"
              }`}
            >
              <span className="textBtn max-md:text-white">
                Mais videos
              </span>
              <svg
                className="w-3 h-3 group-open:rotate-[270deg] transition-all duration-300"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="12"
                  width="12"
                  height="12"
                  rx="3"
                  transform="rotate(90 12 0)"
                  className="max-md:fill-nightDew-100 fill-selector-200 "
                  fill-opacity="0.1"
                />
                <path
                  d="M7.29451 6.00091L4.6459 8.64743C4.45002 8.84332 4.45002 9.16007 4.6459 9.35387C4.84179 9.54975 5.15854 9.54767 5.35442 9.35387L8.3552 6.35517C8.54483 6.16554 8.549 5.86129 8.36979 5.66541L5.3565 2.64587C5.25856 2.54793 5.12936 2.5 5.00225 2.5C4.87513 2.5 4.74593 2.54793 4.64799 2.64587C4.4521 2.84176 4.4521 3.1585 4.64799 3.35231L7.29451 6.00091Z"
                  className="fill-selector-200 stroke-selector-200 max-md:fill-nightDew-100 max-md:stroke-nightDew-100"
                />
              </svg>
            </button>
          </summary>
          <ListControl id={"videos"} length={videosArray.length}>
            <ul
              id="videos"
              className="max-md:flex max-md:flex-col max-xs:gap-[var(--gap)] max-md:gap-[var(--gapXS)] md:ListSpacing md:spacingShrinkerBlock-b max-md:blockContainer-x list-none no-scrollbar relative max-md:animate-showVideoV md:animate-showVideoH"
            >
              {videosArray.map((value, index) => (
                <li
                  id={`videos${index}`}
                  className={`w-full max-md:flex box-content relative snap-start snap-always cursor-pointer   overflow-visible items-center  justify-start md:gridColSpanMovie transform-gpu transition-all duration-300 md:pt-[var(--gapMD)] lg:pt-[var(--gapLG)    ${
                    selected == value &&
                    "max-md:bg-nightDew-300/30  max-xs:py-[calc(var(--gap)/3)] max-xs:pl-[calc(var(--gap)/3)] max-xs:my-[calc((var(--gap)/3)*-1)] max-xs:ml-[calc((var(--gap)/3)*-1)]  max-md:py-[calc(var(--gapXS)/3)] max-md:pl-[calc(var(--gapXS)/3)] max-md:my-[calc((var(--gapXS)/3)*-1)] max-md:ml-[calc((var(--gapXS)/3)*-1)] rounded-xl md:scale-105"
                  }`}
                  onClick={() => setSelected(value)}
                  key={index}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${value.key}/hqdefault.jpg`}
                    className={`object-cover bg-center max-md:w-20 md:w-full aspect-[16/9]  rounded-lg transition-all duration-300  md:shadow-[0_10px_50px_-12px] ${
                      selected == value
                        ? "md:shadow-nightDew-600  "
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
