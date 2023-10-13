import { MovieType } from "./utils/types";
import Link from "next/link";
import Image from "next/image";

export default  function CardMovie({ data }: { data: MovieType }) {
  return (
    <Link href={`/movie/${data.id}`} className="hover:scale-105 transition-all duration-700 ">
      <section className="m-5">
   <div className="h-[225px] w-[150px]   relative ">
   <Image
          src={process.env.DB_IMG_URL_M + data.poster_path}
          alt={data.title}
          height={330}
          width={220}
          // sizes="(max-width: 768px) 100vh, (max-width: 1200px) 50vw, 33vw"
          sizes="150px"

          // fill={true}
          className="rounded-xl object-cover h-full w-auto shadow-xl shadow-black/30"
        />
   </div>
        <div className="w-[150px] hover:  hover:w-[200px] h-auto hover:whitespace-normal   overflow-hidden transition-all">
        <h3 className="text-sm text-center pt-5 text-ellipsis overflow-hidden">{data.title}</h3>
        </div>
      </section>
    </Link>
  );
}
