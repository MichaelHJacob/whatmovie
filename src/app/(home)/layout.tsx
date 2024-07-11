import { NavBar } from "@/components/comps";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return <><NavBar fixed/> {children}</>
  }