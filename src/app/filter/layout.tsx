import { Container } from "@/components/container";
import BtnFilter from "@/components/filterServer/btnFilter";
import { Suspense } from "react";
import Loading from "./loading";
import FilterBtn from "@/components/filterServer/btnFilter";
import FilterContainer from "@/components/filters";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="fixed bg-gradient-to-b from-[#ECF0F3]  dark:from-black  to-transparent w-screen dark:h-28 h-12 top-0 left-0 z-10" />
      
   

      
    
          
      
     
          

     {children}
       
   
      
    </Container>
  );
}
