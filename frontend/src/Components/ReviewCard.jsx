import { Star, UserRound, Quote } from "lucide-react";

function ReviewCard({ review }) {
  const {
    name,
    rating = 5,
    comment,
    date,
    image,
    service,
  } = review;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition duration-300">

      {/* Customer Information */}
      <div className="flex items-center gap-4">

        {image ? (
          <img
            src={image}
            alt={name || "Customer"}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <UserRound size={28} className="text-emerald-700" />
          </div>
        )}

        <div>
          <h3 className="font-bold text-emerald-950">
            {name || "Customer"}
          </h3>

          <p className="text-sm text-gray-400">
            {service || "Customer"}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}

        <span className="ml-2 text-sm font-semibold text-gray-600">
          {rating}/5
        </span>
      </div>

      {/* Review */}
      <div className="relative mt-4">
        <Quote size={22} className="text-emerald-200 mb-2" />

        <p className="text-gray-600 leading-7">
          "{comment || "Great service experience!"}"
        </p>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400 mt-4">
        {date || "Customer Review"}
      </p>

    </div>
  );
}

export default ReviewCard;