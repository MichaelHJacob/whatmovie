import { createContext } from "react";

import { selectOption } from "@/types/globalTypes";

type ListControllerContextType = {
  selected: selectOption[];
};

type ListControllerProviderProps = {
  children: React.ReactNode;
  value: ListControllerContextType | null;
};

export const ListControllerContext =
  createContext<ListControllerContextType | null>(null);

export function ListControllerProvider({
  children,
  value,
}: Readonly<ListControllerProviderProps>) {
  return (
    <ListControllerContext.Provider value={value}>
      {children}
    </ListControllerContext.Provider>
  );
}
