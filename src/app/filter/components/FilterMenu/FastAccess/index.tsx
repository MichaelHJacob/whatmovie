type FastAccessProps = { children: React.ReactNode };

export default function FastAccess({ children }: FastAccessProps) {
  return (
    <div className="no-scrollbar blockContainer-x blockContainer-mb sticky top-11 z-50 flex h-11 w-full items-center gap-2 overflow-x-scroll bg-nightDew-200/30 backdrop-blur-md">
      {children}
    </div>
  );
}
