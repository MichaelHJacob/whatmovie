import { BlockContainer, Container } from "@/components/comps";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      
      <div className="fixed backdrop-blur-sm w-screen h-[6.25rem] xs:h-[7rem] lg:h-[7.25rem] bg-gradient-to-b from-Background/70  via-Background/70  to-transparent  top-0 left-0 z-0 " />
      {/* <div className="fixed backdrop-blur-sm w-screen h-[7.1rem] bg-gradient-to-b from-[#BEC3C4]/70 xl:from-[#D7DCDD]70 via-[#BEC3C4]/70 xl:via-[#D7DCDD]   to-transparent  top-0 left-0 z-0 " /> */}
      {/* dark:from-[#0A0A0A] xl:dark:from-[#0A0A0A] */}
   
  <div className="paddingHeader" />
    
          
      
     
          

     {children}
       
   
     
    </Container>
  );
}
