import Cta from "@/components/landing/Cta";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import Hero from "@/components/landing/Hero";
import { Process } from "@/components/landing/Process";
import Reviews from "@/components/landing/Reviews";

export default function Home() {
  return (
    <div className="flex flex-col font-sans ">
        <Hero/>
        <FeaturedProperties/>
        <Process/> 
        <Cta/>
        <Reviews/>
    </div>
  );
}
