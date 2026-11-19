import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <div className="text-center max-w-lg">

        <h1 className="text-9xl font-extrabold text-indigo-600">
          404
        </h1>

        <h2 className="text-3xl font-bold text-slate-800 mt-4">
          Page Not Found!
        </h2>

        <p className="text-slate-500 mt-4 leading-relaxed">
          Sorry! The page you are looking for doesn't exist
          or may have been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">

          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Back to Home
          </Link>

          <Link
            to="/search"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Explore Services
          </Link>

        </div>

      </div>

    </div>
  );
}

export default NotFound;