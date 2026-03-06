"use client";

import { usePathname } from "next/navigation";

export default function NavPathProvider() {
  const pathname = usePathname();
  const path = pathname.split("/").at(1) ?? "default";
  const theme = path.split("-").at(0)?.length ? "movie" : path;

  return <div data-theme={theme} className="peer" />;
}
