import { ComponentProps, forwardRef } from "react";

type LoadingDotsProps = ComponentProps<"div">;

const LoadingDots = forwardRef(function Dots(
  { ...props }: LoadingDotsProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      role="status"
      ref={ref}
      {...props}
      className={`flex flex-1 flex-nowrap items-center justify-center gap-x-3 ${props.className}`}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 animate-pulseDots rounded-full bg-inverted-minimal animate-duration-[2s] animate-infinite animate-ease-in" />
      <div className="h-2 w-2 animate-pulseDots rounded-full bg-inverted-minimal animate-delay-[300ms] animate-duration-[2s] animate-infinite animate-ease-in" />
      <div className="h-2 w-2 animate-pulseDots rounded-full bg-inverted-minimal animate-delay-[600ms] animate-duration-[2s] animate-infinite animate-ease-in" />
    </div>
  );
});

export default LoadingDots;
