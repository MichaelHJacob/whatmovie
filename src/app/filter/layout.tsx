import { Container } from "@/components/container";

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
