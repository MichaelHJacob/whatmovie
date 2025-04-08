import MovieCards from "@/components/skeleton/MovieCards";

export default function SkeletonListMovie() {
  return (
    <section className="bg-nightDew-100 relative before:bg-nightDew-100  before:w-screen before:h-full before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:z-[-1]">
      <div className="py-2 xs:py-[1rem] lg:py-6 blockContainer-x">
        <div className="h-6 w-24 rounded-lg mb-2 bg-nightDew-600/20" />
      </div>

      <ul className="ListSpacing items-end">
        <MovieCards id="Recommendations" />
      </ul>
    </section>
  );
}