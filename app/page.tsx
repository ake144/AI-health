import FooterPage from "@/components/footer";
import MainPage from "@/components/main/home";
import { NavigationMenuDemo } from "@/components/nav/navBar";

export default function Home() {
  return (
   <div>
     <NavigationMenuDemo />
     <div>
     <MainPage  />     
     </div>
     <div>
     <FooterPage />
     </div>
    
    </div>    
  );
}
