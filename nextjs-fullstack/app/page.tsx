import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/rooms/SearchBar";
import { FeaturedRooms } from "@/components/rooms/FeaturedRooms";
export default function HomePage() {
  return <main><HeroSection /><SearchBar /><FeaturedRooms /></main>;
}
