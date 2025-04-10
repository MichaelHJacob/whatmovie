import { ReactNode } from "react";

type ContainerProps = { children: ReactNode; paddingTop?: boolean };

export default function Container({ children, paddingTop }: ContainerProps) {
  return (
    <div
      className={`mx-auto h-auto w-full max-w-7xl ${
        paddingTop && "paddingHeader"
      }`}
    >
      {children}
    </div>
  );
}
