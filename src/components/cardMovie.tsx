import { MovieType } from "./utils/types";
import Link from "next/link";
import Image from "next/image";

export default async function CardMovie({ data }: { data: MovieType }) {
  return (
    <Link
      href={`/movie/${data.id}`}
      className="  hover:scale-105 transition-all duration-700 transform  relative h-auto    "
    >
      <div className=" relative m-4 ">
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          height={330}
          width={220}
          sizes="150px"
          className="rounded-lg w-full   shadow-xl shadow-black/30"
        />
      </div>
    </Link>
  );
}
