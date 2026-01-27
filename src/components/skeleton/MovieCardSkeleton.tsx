import { forwardRef } from "react";

type MovieCardSkeletonProps = {
  id?: string;
  size?: number;
  base?: number;
  xs?: number;
  md?: number;
  lg?: number;
  xl?: number;
  style?: string;
};

const MovieCardSkeleton = forwardRef(function MovieCardSkeleton(
  {
    id = "loadC",
    size = 6,
    base = 2,
    xs = 3,
    md = 4,
    lg = 5,
    xl = 6,
    style,
  }: MovieCardSkeletonProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const skeleton = [];
  for (let i = 0; i < size; i++) {
    skeleton.push(
      <li
        key={i}
        id={id + i}
        ref={i === 0 ? ref : undefined}
        className={`gridColSpanMovie ${style} ${size <= 6 && i >= base && "max-xs:hidden"} ${size <= 6 && i >= xs && "xs:max-md:hidden"} ${size <= 6 && i >= md && "md:max-lg:hidden"} ${size <= 6 && i >= lg && "lg:max-xl:hidden"} ${size <= 6 && i >= xl && "xl:max-2xl:hidden"}`}
      >
        <div className="unavailable aspect-[2/3] w-full animate-pulse rounded-lg shadow-card max-xs:shadow-card-subtle" />
      </li>,
    );
  }

  return skeleton;
});

export default MovieCardSkeleton;
