 type ImageProfileUnavailableProps =  { alt: string } 

  export default function ImageProfileUnavailable({ alt }: ImageProfileUnavailableProps) {
    return (
      <div className="rounded-full overflow-hidden aspect-square relative unavailable light-shadow">
        <p className="textBtn text-opacity-30 text-center text-xs  text-wrap  w-min  absolute bottom-1 left-[50%] translate-x-[-50%] top-[10%]">
          imagem indisponível
        </p>
        <span className="overflow-hidden h-min w-[50%]  absolute left-[50%] translate-x-[-50%] bottom-[15%]">
          <p className="textBtn text-opacity-90 line-clamp-1 h-auto   overflow-hidden text-center  text-wrap    ">
            {alt}
          </p>
        </span>
      </div>
    );
  }