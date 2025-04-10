import { Suspense } from "react";

import Loading from "@/app/movie/[movieId]/loading";
import NavBar from "@/components/layout/NavBar";

type MovieLayoutProps = { children: React.ReactNode };

export default function MovieLayout({ children }: MovieLayoutProps) {
  return (
    <>
      <NavBar dark />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
