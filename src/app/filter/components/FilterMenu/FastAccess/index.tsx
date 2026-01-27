type FastAccessProps = { children: React.ReactNode };
export default function FastAccess({ children }: Readonly<FastAccessProps>) {
  return (
    <div className="no-scrollbar blockContainer-px blockContainer-mb sticky top-11 z-30 flex h-[--p] min-h-11 w-full items-center gap-2 overflow-x-scroll xs:h-[--pXS] md:h-[--pMD] lg:h-[--pLG]">
      {children}
    </div>
  );
}
