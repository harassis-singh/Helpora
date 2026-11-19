import { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchBar({ onSearch }) {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      service: service.trim(),
      location: location.trim(),
    };

    if (!searchData.service && !searchData.location) {
      alert("Please enter a service or location!");
      return;
    }

    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-3 rounded-2xl shadow-lg flex flex-col md:flex-row gap-3 w-full"
    >
      {/* Service Input */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-[#477BFF]">
        <Search className="text-[#5428A8]" size={22} />

        <input
          type="text"
          placeholder="What service do you need?"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700"
        />
      </div>

      {/* Location Input */}
      <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-[#477BFF]">
        <MapPin className="text-[#5428A8]" size={22} />

        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700"
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#477BFF] hover:bg-[#315FE0] text-white font-semibold transition duration-300"
      >
        <Search size={20} />
        Search
      </button>
    </form>
  );
}

export default SearchBar;