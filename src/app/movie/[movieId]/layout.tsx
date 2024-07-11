import { Suspense } from "react";
import Loading from "./loading";
import { NavBar } from "@/components/comps";

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <NavBar dark />
    <Suspense
      fallback={<Loading />}
    >

     {children}
    </Suspense>
    </>
  );
}
