import { MovieType } from "./utils/types";
import Link from "next/link";
import Image from "next/image";

export default  function CardMovie({ data }: { data: MovieType }) {
  return (
    // <Link href={`/movie/${data.id}`} className="hover:scale-105 transition-all duration-700" prefetch={false}>
      <section className="p-4  bg-white m-3">
        <Image
          src={process.env.DB_IMG_URL_M + data.poster_path}
          alt={data.title}
          width={220}
          height={330}
          // sizes="(max-width: 768px) 100vh, (max-width: 1200px) 50vw, 33vw"

          className="rounded-md "
        />
        <h3 className="text-sm text-center text-gray-700">{data.title}</h3>
      </section>
    // </Link>
  );
}
