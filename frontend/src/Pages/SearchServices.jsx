
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";

function SearchServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/services");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load services");
        }

        setServices(data.services || []);
      } catch (err) {
        setError(err.message || "Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = [
    "All Categories",
    ...new Set(services.map((service) => service.category).filter(Boolean)),
  ];

  const filteredServices = services.filter((service) => {
    const providerName = service.provider?.name || "";

    const matchesSearch =
      service.title?.toLowerCase().includes(search.toLowerCase()) ||
      service.category?.toLowerCase().includes(search.toLowerCase()) ||
      providerName.toLowerCase().includes(search.toLowerCase());

    const matchesLocation = service.location
      ?.toLowerCase()
      .includes(location.toLowerCase());

    const matchesCategory =
      category === "All Categories" || service.category === category;

    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5faf7] text-[#173b30]">

      {/* Header */}
      <section className="bg-gradient-to-r from-[#064e3b] to-[#009966] text-white py-14 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find the Right Service Provider
          </h1>
          <p className="text-[#e5f4ed]">
            Search trusted local professionals near you.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative">
        <div className="bg-white border border-[#d6ebe1] rounded-xl shadow-lg p-5 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="flex items-center border border-[#c6e8d8] rounded-lg px-4">
            <Search className="text-[#007a55]" size={20} />
            <input
              type="text"
              placeholder="Search service or provider"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 outline-none bg-transparent text-[#173b30] placeholder:text-[#71877d]"
            />
          </div>

          <div className="flex items-center border border-[#c6e8d8] rounded-lg px-4">
            <MapPin className="text-[#007a55]" size={20} />
            <input
              type="text"
              placeholder="Enter city or location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 outline-none bg-transparent text-[#173b30] placeholder:text-[#71877d]"
            />
          </div>

          <div className="flex items-center border border-[#c6e8d8] rounded-lg px-4">
            <SlidersHorizontal className="text-[#007a55]" size={20} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 outline-none text-[#173b30] bg-white"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Service Results */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#173b30]">
            Available Service Providers
          </h2>
          <p className="text-[#526b61] mt-2">
            {loading ? "Loading services..." : `${filteredServices.length} services found`}
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center">
            Loading services...
          </div>
        ) : error ? (
          <div className="bg-white border border-red-200 rounded-xl p-12 text-center">
            <h3 className="text-xl font-bold text-red-600">
              Unable to Load Services
            </h3>
            <p className="text-[#526b61] mt-2">{error}</p>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white border border-[#d6ebe1] rounded-xl shadow-sm hover:shadow-lg transition p-6"
              >
                <div className="h-36 bg-[#e2f4eb] rounded-lg flex items-center justify-center text-6xl mb-5">
                  🛠️
                </div>

                <h3 className="text-xl font-bold text-[#173b30]">
                  {service.title}
                </h3>

                <p className="text-[#007a55] font-medium mt-2">
                  {service.category}
                </p>

                <p className="text-[#526b61] mt-3">
                  Provider: {service.provider?.name || "Service Provider"}
                </p>

                <div className="flex items-center gap-2 text-[#526b61] mt-3">
                  <MapPin size={17} />
                  {service.location}
                </div>

                <div className="flex items-center gap-2 text-[#526b61] mt-2">
                  <Star size={17} className="text-[#009966]" />
                  Rating not available yet
                </div>

                <p className="text-[#526b61] mt-2 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mt-5 gap-3">
                  <p className="text-xl font-bold text-[#173b30]">
                    ₹{service.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/provider/${service._id}`, {
                        state: {
                          provider: {
                            ...service,
                            id: service._id,
                            name: service.provider?.name || "Service Provider",
                            service: service.title,
                            profession: service.category,
                            experience: "Not specified",
                            rating: "Not available",
                            reviews: 0,
                            services: [service.title],
                          },
                        },
                      })
                    }
                    className="bg-[#009966] text-white px-4 py-2 rounded-lg hover:bg-[#007a55]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#d6ebe1] rounded-xl p-12 text-center shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#173b30]">
              No Services Found
            </h3>
            <p className="text-[#526b61] mt-2">
              Try changing your search or location, or check back when providers add services.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchServices;
