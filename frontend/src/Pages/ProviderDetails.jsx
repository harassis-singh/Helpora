import { Link, useLocation, useParams } from "react-router-dom";
import { MapPin, Star, Briefcase, ArrowLeft } from "lucide-react";

function ProviderDetails() {
  const { id } = useParams();
  const location = useLocation();

  const provider = location.state?.provider || {
    id,
    name: "Service Provider",
    service: "Home Service",
    location: "Junagadh, Gujarat",
    rating: "New",
    price: 0,
    description: "Professional local service provider.",
    experience: "Experience details not available",
    reviews: 0,
    services: [],
  };

  const services =
    provider.services ||
    [provider.service || "Home Service"];

  return (
    <div className="min-h-screen bg-[#f5faf7] py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#007a55] font-semibold mb-6 hover:text-[#064e3b]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Profile Section */}
        <div className="bg-white border border-[#d6ebe1] rounded-2xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div className="w-32 h-32 rounded-full bg-[#e2f4eb] flex items-center justify-center text-5xl">
              👨‍🔧
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-[#173b30]">
                {provider.name}
              </h1>

              <p className="text-[#007a55] mt-2 font-medium">
                {provider.service || provider.profession}
              </p>

              <p className="text-[#526b61] mt-2 flex items-center justify-center md:justify-start gap-2">
                <MapPin size={18} />
                {provider.location || "Location not available"}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">

                <span className="text-yellow-600 font-semibold flex items-center gap-1">
                  <Star size={17} className="fill-yellow-400" />
                  {provider.rating ?? "New"}
                </span>

                <span className="text-[#526b61] flex items-center gap-2">
                  <Briefcase size={17} />
                  {provider.experience || "Professional Service Provider"}
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white border border-[#d6ebe1] rounded-2xl shadow-sm p-8 mt-6">
          <h2 className="text-2xl font-bold text-[#173b30] mb-4">
            About Provider
          </h2>

          <p className="text-[#526b61] leading-relaxed">
            {provider.description || "Professional local service provider offering reliable and quality services."}
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-white border border-[#d6ebe1] rounded-2xl shadow-sm p-8 mt-6">
          <h2 className="text-2xl font-bold text-[#173b30] mb-5">
            Services Offered
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[#e2f4eb] p-4 rounded-xl text-[#173b30] font-medium"
              >
                ✓ {service}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white border border-[#d6ebe1] rounded-2xl shadow-sm p-8 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5">

            <div>
              <p className="text-[#526b61]">
                Starting Price
              </p>

              <h2 className="text-3xl font-bold text-[#007a55] mt-2">
                {provider.price != null && provider.price !== ""
                  ? `₹${provider.price}`
                  : "Contact for price"}
              </h2>
            </div>

            <Link
              to={`/service-request/${id}`}
              state={{ provider }}
              className="bg-[#009966] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#007a55] transition"
            >
              Book Service
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProviderDetails;