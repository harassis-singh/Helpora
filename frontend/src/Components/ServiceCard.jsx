import {
  Zap,
  Droplets,
  Sparkles,
  Paintbrush,
  Hammer,
  BookOpen,
  Wrench,
  Scissors,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ServiceCard({ onCategoryClick }) {
  const navigate = useNavigate();

  const services = [
    {
      name: "Electrician",
      icon: <Zap size={30} />,
      description: "Electrical repair and wiring services.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      name: "Plumber",
      icon: <Droplets size={30} />,
      description: "Professional plumbing and pipe repair.",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      name: "Cleaning",
      icon: <Sparkles size={30} />,
      description: "Home cleaning and deep cleaning services.",
      color: "bg-lime-100 text-lime-600",
    },
    {
      name: "Painting",
      icon: <Paintbrush size={30} />,
      description: "Professional home painting services.",
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Carpenter",
      icon: <Hammer size={30} />,
      description: "Furniture repair and woodwork services.",
      color: "bg-teal-100 text-teal-600",
    },
    {
      name: "Home Tutor",
      icon: <BookOpen size={30} />,
      description: "Find experienced home tutors.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Repairing",
      icon: <Wrench size={30} />,
      description: "Home appliance repair services.",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Salon",
      icon: <Scissors size={30} />,
      description: "Beauty and personal care services.",
      color: "bg-lime-100 text-lime-700",
    },
  ];

  const handleClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      navigate("/search", {
        state: { service: category },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <div
          key={service.name}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-emerald-50 group"
        >
          <div
            className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition`}
          >
            {service.icon}
          </div>

          <h3 className="text-xl font-bold text-emerald-950 mb-2">
            {service.name}
          </h3>

          <p className="text-gray-500 text-sm mb-5">
            {service.description}
          </p>

          <button
            onClick={() => handleClick(service.name)}
            className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-800 transition"
          >
            Explore Services
            <ArrowRight size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ServiceCard;