import FeaturedProperties from "@/components/landing/FeaturedProperties";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="flex flex-col font-sans">
        <Hero/>
        <FeaturedProperties/>
      
    </div>
  );
}
