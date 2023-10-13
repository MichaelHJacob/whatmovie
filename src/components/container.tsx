import { ReactNode } from "react";

export function Container({children}: {children: ReactNode}){
    return(
        <div className="max-w-5xl mx-auto px-3">
            {children}
        </div>
    )
}