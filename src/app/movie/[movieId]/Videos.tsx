"use client";
import { SetStateAction, useState } from "react";
import { BlockContainer, Break, SubTitle, SubTitle2 } from "@/components/comps";
import {
  VideosResultsType,
} from "@/components/utils/types";


export default function Videos({videosArray} : {videosArray: VideosResultsType[]}) {


  const [selected, setSelected] = useState(videosArray[0]);

  function handleVideoClick(v : VideosResultsType) {
    setSelected(v);
  }

  function VideoDisplay({video} : {video: VideosResultsType}) {
    return (
      <div className={`lg:col-[1/_span_15] max-md:pb-5 md:pl-5 pt-5   md:sticky top-0 md:h-full flex flex-col  w-full box-border ${ videosArray.length > 1 ? `md:col-[1/_span_8] lg:col-[1/_span_15]` : `md:col-[1/_span_12] lg:col-[1/_span_20]`}`}>
        <div className="relative top-0 flex-1">
          <iframe
            className="w-full h-full aspect-video rounded-md"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameBorder="0"
          ></iframe>
        </div>

        <SubTitle2>{video.name}</SubTitle2>
      </div>
    );
  }


  return (
    <><Break />
    <BlockContainer>
      <SubTitle>Videos, Trailers e mais</SubTitle>
      <div className="transition-all max-md:w-screen  w-full md:aspect-[19/9] relative duration-700 bg-black md:rounded-lg
      
      md:gridTemplateSpace
   
      
      max-md:spacingShrinkerBlock
       ">
        <VideoDisplay video={selected} />

        <div className={`md:col-[9/_span_4] lg:col-[16/_span_5] w-full md:h-full bg-Surface/10 p-4  overflow-scroll  select-none 
        scroll-pl-[var(--p)] 
        md:scroll-pt-[var(--pXS)] 
        lg:scroll-pt-[var(--pLG)] snap-mandatory snap-both scroll-smooth overscroll-contain scrollStyle 
        ${ videosArray.length > 1 ? 'inline-flex md:block' : 'hidden'}`}>
          
          {videosArray.map((value, index) => (
            <div
              className={`md:w-full snap-start snap-always bg-Surface/10 rounded-lg px-4 pt-4  max-xs:mr-[var(--gap)] max-md:mr-[var(--gapXS)] md:mb-[var(--gapMD)] cursor-pointer ${selected == value && 'hidden'}`}
            
              onClick={() =>  setSelected(value)} key={index}
            >
              <div
                className=" max-md:w-[30vw] md:h-full  aspect-video   shadow-xl shadow-black rounded-lg overflow-hidden " >
               <img src={`https://i.ytimg.com/vi/${value.key}/hqdefault.jpg`} className="object-cover  aspect-video md:h-full w-full "/>
              </div>
              <SubTitle2>{value.name}</SubTitle2>
            </div>
          ))}
         
           
        </div>
      </div>
    </BlockContainer>
    </>
  );
}
