import MovieCards from "@/components/skeleton/MovieCards";

export default function SkeletonListMovie() {
  return (
    <section className="relative bg-nightDew-100 before:absolute before:bottom-0 before:left-[50%] before:z-[-1] before:h-full before:w-screen before:translate-x-[-50%] before:bg-nightDew-100">
      <div className="blockContainer-x py-2 xs:py-[1rem] lg:py-6">
        <div className="mb-2 h-6 w-24 rounded-lg bg-nightDew-600/20" />
      </div>

      <ul className="ListSpacing items-end">
        <MovieCards id="Recommendations" />
      </ul>
    </section>
  );
}
