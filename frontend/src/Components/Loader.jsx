import { LoaderCircle } from "lucide-react";

function Loader({ message = "Loading, please wait..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      {/* Loading Animation */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin"></div>

        <LoaderCircle
          size={25}
          className="absolute text-emerald-600"
        />
      </div>

      {/* Loading Text */}
      <p className="mt-5 text-emerald-800 font-semibold text-lg">
        {message}
      </p>

      <p className="text-gray-400 text-sm mt-1">
        Helpora is getting things ready for you.
      </p>

    </div>
  );
}

export default Loader;