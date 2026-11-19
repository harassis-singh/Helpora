import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";

import SearchBar from "../Components/SearchBar";
import CategoryCard from "../Components/CategoryCard";
import ProviderCard from "../Components/ProviderCard";
import ReviewCard from "../Components/ReviewCard";

const providers = [
  {
    id: 1,
    name: "Raj Electrical Services",
    service: "Electrician",
    location: "Junagadh",
    rating: 4.8,
    price: 300,
    image: "",
    description: "Home electrical repair, wiring and installation services.",
  },
  {
    id: 2,
    name: "Quick Plumbing Services",
    service: "Plumber",
    location: "Junagadh",
    rating: 4.7,
    price: 250,
    image: "",
    description: "Professional plumbing and water pipe repair services.",
  },
  {
    id: 3,
    name: "Clean Home Services",
    service: "Cleaning",
    location: "Junagadh",
    rating: 4.9,
    price: 500,
    image: "",
    description: "Home cleaning and deep cleaning services.",
  },
];

const reviews = [
  {
    name: "Priya",
    rating: 5,
    comment: "Very helpful service. The experience was smooth and professional.",
    date: "Sample Review",
    service: "Home Cleaning",
    image: "",
  },
  {
    name: "Rahul",
    rating: 4,
    comment: "Good service and friendly behaviour. Would recommend.",
    date: "Sample Review",
    service: "Plumbing",
    image: "",
  },
  {
    name: "Amit",
    rating: 5,
    comment: "Quick response and excellent work quality.",
    date: "Sample Review",
    service: "Electrical Work",
    image: "",
  },
];

function Home() {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    navigate("/search", {
      state: {
        service: searchData.service,
        location: searchData.location,
      },
    });
  };

  const handleCategoryClick = (category) => {
    navigate("/search", {
      state: { service: category },
    });
  };

  return (
    <div className="bg-[#f5faf7] text-[#173b30] min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#064e3b] to-[#009966] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">

          <span className="inline-block bg-[#fbbf24] text-[#173b30] font-semibold px-5 py-2 rounded-full text-sm mb-6">
            Find Local Professionals Easily
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Trusted Services Near You
          </h1>

          <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
            Book reliable local professionals for your everyday needs.
            Quality services, right at your doorstep.
          </p>

          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>

        </div>
      </section>

      {/* Why Choose Helpora */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border border-[#d6ebe1] rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-[#e2f4eb] p-4 rounded-xl">
              <ShieldCheck size={30} className="text-[#007a55]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Trusted Services</h3>
              <p className="text-gray-500 text-sm">Find local professionals</p>
            </div>
          </div>

          <div className="bg-white border border-[#d6ebe1] rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-[#e2f4eb] p-4 rounded-xl">
              <Clock size={30} className="text-[#007a55]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Easy Booking</h3>
              <p className="text-gray-500 text-sm">Request services easily</p>
            </div>
          </div>

          <div className="bg-white border border-[#d6ebe1] rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-[#e2f4eb] p-4 rounded-xl">
              <Users size={30} className="text-[#007a55]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Local Experts</h3>
              <p className="text-gray-500 text-sm">Explore nearby providers</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Browse Categories
          </h2>

          <p className="text-gray-500 mt-3">
            Find the right professional for your needs.
          </p>
        </div>

        <CategoryCard onCategoryClick={handleCategoryClick} />

      </section>

      {/* Popular Providers */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Popular Service Providers
            </h2>

            <p className="text-gray-500 mt-2">
              Explore local service providers.
            </p>
          </div>

          <button
            onClick={() => navigate("/search")}
            className="hidden md:flex items-center gap-2 text-[#007a55] font-semibold hover:text-[#064e3b]"
          >
            View All <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-5">
          Sample provider information for frontend development only.
        </p>

      </section>

      {/* Customer Reviews */}
      <section className="bg-[#eaf5ef] py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              What Customers Say
            </h2>

            <p className="text-gray-500 mt-3">
              Sample reviews for Helpora frontend demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-[#064e3b] to-[#009966] py-16 px-6 text-center text-white">

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need Help With Your Home Services?
        </h2>

        <p className="text-emerald-50 mb-8">
          Find the right local professional with Helpora.
        </p>

        <button
          onClick={() => navigate("/search")}
          className="bg-[#fbbf24] text-[#173b30] px-8 py-3 rounded-xl font-bold hover:bg-[#f59e0b] transition"
        >
          Explore Services
        </button>

      </section>

    </div>
  );
}

export default Home;