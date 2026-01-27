import NavBar from "@/components/layout/NavBar";

type HomeLayoutProps = { children: React.ReactNode };

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <>
      <NavBar fixed />
      {children}
    </>
  );
}
