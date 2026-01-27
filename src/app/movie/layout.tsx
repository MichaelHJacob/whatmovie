import NavBar from "@/components/layout/NavBar";

type MovieLayoutProps = { children: React.ReactNode };

export default function MovieLayout({ children }: Readonly<MovieLayoutProps>) {
  return (
    <>
      <NavBar dark />
      {children}
    </>
  );
}
