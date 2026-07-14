"use client";

import { ReactNode, createContext, useContext } from "react";

import { imgBaseUrlType } from "@/lib/utils/getImageBaseUrl";

type TmdbConfigProviderProps = {
  children: ReactNode;
  config: imgBaseUrlType;
};

const TmdbConfigContext = createContext<imgBaseUrlType | null>(null);

export default function TmdbConfigProvider({
  children,
  config,
}: Readonly<TmdbConfigProviderProps>) {
  return (
    <TmdbConfigContext.Provider value={config}>
      {children}
    </TmdbConfigContext.Provider>
  );
}

export function useTmdbConfigContext() {
  const context = useContext(TmdbConfigContext);
  if (!context) {
    throw new Error("Outside the provider");
  } else {
    return context;
  }
}
