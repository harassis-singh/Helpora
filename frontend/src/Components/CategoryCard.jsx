import {
  Zap,
  Droplets,
  Sparkles,
  Paintbrush,
  Hammer,
  BookOpen,
  Wrench,
  Scissors,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electrician", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  { name: "Plumber", icon: Droplets, color: "bg-emerald-100 text-emerald-600" },
  { name: "Cleaning", icon: Sparkles, color: "bg-lime-100 text-lime-600" },
  { name: "Painting", icon: Paintbrush, color: "bg-green-100 text-green-600" },
  { name: "Carpenter", icon: Hammer, color: "bg-teal-100 text-teal-600" },
  { name: "Home Tutor", icon: BookOpen, color: "bg-emerald-100 text-emerald-700" },
  { name: "Repairing", icon: Wrench, color: "bg-green-100 text-green-700" },
  { name: "Salon", icon: Scissors, color: "bg-lime-100 text-lime-700" },
];

function CategoryCard({ onCategoryClick }) {
  const navigate = useNavigate();

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.name}
            onClick={() => handleClick(category.name)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-400 transition duration-300 group text-center"
          >
            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${category.color} group-hover:scale-110 transition`}
            >
              <Icon size={30} />
            </div>

            <h3 className="mt-4 font-semibold text-emerald-950 group-hover:text-emerald-700">
              {category.name}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Explore Services
            </p>
          </button>
        );
      })}

    </div>
  );
}

export default CategoryCard;