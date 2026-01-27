"use client";

import { useState } from "react";

import ListVideo from "@/app/movie/[movieId]/components/layout/Videos/ListVideo";
import VideoDisplay from "@/app/movie/[movieId]/components/layout/Videos/VideoDisplay";
import Container from "@/components/layout/Container";
import BreakHr from "@/components/ui/BreakHr";
import FoggyEdge from "@/components/ui/FoggyEdge";
import HTitle from "@/components/ui/HTitle";
import { ObjVideoType } from "@/lib/validation/videosSchema";
import { selectOption } from "@/types/globalTypes";
import { clsx } from "clsx";
import { tv } from "tailwind-variants";

type VideosProps = { videosArray: ObjVideoType[] };
const videoListStyles = tv({
  slots: {
    listBoxContainer:
      "lg:reducerBlock-y lg:reducerBlock-x relative z-0 col-span-full row-span-1 max-lg:before:hidden max-lg:after:hidden lg:col-span-7 xl:col-span-4",
  },
});

export default function Videos({ videosArray }: Readonly<VideosProps>) {
  const [selected, setSelected] = useState<selectOption>({
    id: videosArray[0].id,
    index: 0,
  });

  const { listBoxContainer } = videoListStyles();

  function toggleSelect(option: selectOption) {
    setSelected(option);
  }

  return (
    <>
      <Container as="section" className="max-lg:bg-black">
        <HTitle className="text-neutral-strong max-lg:text-white-strong">
          Videos, Trailers e mais
        </HTitle>

        <div className="lg:blockContainer-p gridTemplateSpace auto-rows-auto max-lg:gap-0">
          <div className="relative col-span-full row-span-1 flex flex-col lg:col-[span_13/span_13] xl:col-span-8">
            <VideoDisplay
              className="z-20 order-1"
              video={selected && videosArray[selected.index]}
            />
          </div>
          <FoggyEdge
            side="bothY"
            surfaceColor="bodyDense"
            fadeOutGradient={false}
            className={clsx(listBoxContainer())}
          >
            <ListVideo
              data={videosArray}
              onToggleSelect={toggleSelect}
              selected={selected}
            />
          </FoggyEdge>
        </div>
      </Container>
      <BreakHr className="relative z-20" />
    </>
  );
}
