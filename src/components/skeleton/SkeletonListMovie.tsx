import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";

export default function SkeletonListMovie() {
  return (
    <div className="relative before:absolute before:bottom-0 before:left-[50%] before:z-[-1] before:h-full before:w-screen before:translate-x-[-50%] before:bg-base">
      <div className="blockContainer-px py-2 xs:py-[1rem] lg:py-6">
        <div className="mb-2 h-6 w-52 rounded-lg bg-black/30 dark:bg-white/30" />
      </div>

      <div className="listSpacing items-end">
        <MovieCardSkeleton id="Recommendations" />
      </div>
    </div>
  );
}
