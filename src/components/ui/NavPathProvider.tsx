"use client";

import { usePathname } from "next/navigation";

export default function NavPathProvider() {
  const pathname = usePathname();
  const path = pathname.split("/").at(1) ?? "";

  return <div data-theme={path || "default"} className="peer" />;
}
