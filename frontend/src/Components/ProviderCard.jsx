import { MapPin, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProviderCard({ provider }) {
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    service,
    location,
    rating,
    price,
    image,
    description,
  } = provider;

  const defaultImage =
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600";

  const handleViewDetails = () => {
    const providerId = _id || id;

    if (!providerId) {
      alert("Provider ID not found!");
      return;
    }

    navigate(`/provider/${providerId}`, {
      state: { provider },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition duration-300 group">

      <div className="h-48 bg-emerald-50 overflow-hidden">
        <img
          src={image || defaultImage}
          alt={name || "Service Provider"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultImage;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">

        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-lg font-bold text-emerald-950">
              {name || "Service Provider"}
            </h3>

            <p className="text-emerald-700 font-medium text-sm mt-1">
              {service || "Home Service"}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={15} className="text-yellow-500 fill-yellow-500" />

            <span className="text-sm font-semibold text-gray-700">
              {rating ?? "New"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-3 text-sm">
          <MapPin size={17} className="text-emerald-600" />
          {location || "Location not available"}
        </div>

        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
          {description || "Professional local service provider."}
        </p>

        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">

          <div>
            <p className="text-xs text-gray-400">
              Starting Price
            </p>

            <p className="text-lg font-bold text-emerald-950">
              {price != null ? `₹${price}` : "Contact for price"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleViewDetails}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            View Details
            <ArrowRight size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProviderCard;