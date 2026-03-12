import { SearchBar } from "../components/rooms/SearchBar";
export default function HomePage() {
  return (
    <div>
      <div className="h-96 bg-blue-900 flex items-center justify-center text-white">
        <h1 className="text-5xl font-bold">Grand Hotel</h1>
      </div>
      <SearchBar />
    </div>
  );
}
