"use client";

import { useState } from "react";

import VideoDisplay from "@/app/movie/[movieId]/components/layout/Videos/VideoDisplay";
import BreakHr from "@/components/ui/BreakHr";
import LabelH4 from "@/components/ui/LabelH4";
import ListScrollController from "@/components/ui/ListScrollController/index";
import SubTitle from "@/components/ui/SubTitle";
import { VideosResultsType } from "@/components/utils/types";

type VideosProps = { videosArray: VideosResultsType[] };

export default function Videos({ videosArray }: VideosProps) {
  const [selected, setSelected] = useState(videosArray[0]);

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
          className="blockContainer-b group relative h-min w-full"
        >
          <summary
            id="summary"
            className="blockContainer-x relative z-30 flex h-min w-full items-center justify-between"
            onClick={(e) => e.preventDefault()}
          >
            <LabelH4>
              <span className="max-md:text-white">{selected.name}</span>
            </LabelH4>
            <button
              onClick={() => {
                const dVideos = document.getElementById("detailsVideos");

                if (dVideos?.hasAttribute("open")) {
                  dVideos.removeAttribute("open");
                } else {
                  dVideos?.setAttribute("open", "open");
                }
              }}
              className={`backBtn max-md:bg-opacity-10 max-md:shadow-none ${
                videosArray.length <= 1 && "hidden"
              }`}
            >
              <span className="textBtn max-md:text-white">Mais videos</span>
              <svg
                className="h-3 w-3 transition-all duration-300 group-open:rotate-[270deg]"
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
                  className="fill-selector-200 max-md:fill-nightDew-100"
                  fill-opacity="0.1"
                />
                <path
                  d="M7.29451 6.00091L4.6459 8.64743C4.45002 8.84332 4.45002 9.16007 4.6459 9.35387C4.84179 9.54975 5.15854 9.54767 5.35442 9.35387L8.3552 6.35517C8.54483 6.16554 8.549 5.86129 8.36979 5.66541L5.3565 2.64587C5.25856 2.54793 5.12936 2.5 5.00225 2.5C4.87513 2.5 4.74593 2.54793 4.64799 2.64587C4.4521 2.84176 4.4521 3.1585 4.64799 3.35231L7.29451 6.00091Z"
                  className="fill-selector-200 stroke-selector-200 max-md:fill-nightDew-100 max-md:stroke-nightDew-100"
                />
              </svg>
            </button>
          </summary>
          <ListScrollController id={"videos"} length={videosArray.length}>
            <ul
              id="videos"
              className="md:ListSpacing md:reducerBlock-b max-md:blockContainer-x no-scrollbar relative list-none max-md:flex max-md:animate-showVideoV max-md:flex-col max-md:gap-[--gapXS] max-xs:gap-[--gap] md:animate-showVideoH"
            >
              {videosArray.map((value, index) => (
                <li
                  id={`videos${index}`}
                  className={`md:gridColSpanMovie lg:pt-[var(--gapLG) relative box-content w-full transform-gpu cursor-pointer snap-start snap-always items-center justify-start overflow-visible transition-all duration-300 max-md:flex md:pt-[var(--gapMD)] ${
                    selected == value &&
                    "rounded-xl max-md:my-[calc((var(--gapXS)/3)*-1)] max-md:ml-[calc((var(--gapXS)/3)*-1)] max-md:bg-nightDew-300/30 max-md:py-[calc(var(--gapXS)/3)] max-md:pl-[calc(var(--gapXS)/3)] max-xs:my-[calc((var(--gap)/3)*-1)] max-xs:ml-[calc((var(--gap)/3)*-1)] max-xs:py-[calc(var(--gap)/3)] max-xs:pl-[calc(var(--gap)/3)] md:scale-105"
                  }`}
                  onClick={() => setSelected(value)}
                  key={index}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${value.key}/hqdefault.jpg`}
                    className={`aspect-[16/9] rounded-lg bg-center object-cover transition-all duration-300 max-md:w-20 md:w-full md:shadow-[0_10px_50px_-12px] ${
                      selected == value
                        ? "md:shadow-nightDew-600"
                        : "md:shadow-transparent"
                    }`}
                    alt={value.name}
                  />
                  <div className="w-full px-[calc(var(--p)/2)] xs:px-[calc(var(--pXS)/2)] md:px-0">
                    <h4
                      className={`data line-clamp-2 py-0 antialiased max-md:text-white/70 ${
                        selected == value && "text-black max-md:font-semibold"
                      }`}
                    >
                      {value.name}
                    </h4>
                  </div>
                </li>
              ))}
            </ul>
          </ListScrollController>
        </details>
      </div>
      <BreakHr />
    </>
  );
}
