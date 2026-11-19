
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function ServiceRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedService = location.state?.provider;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const token = sessionStorage.getItem("helporaToken");

    if (!token) {
      alert("Please log in as a customer before booking.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const requestedDate = new Date(
        `${formData.date}T${formData.time}:00`
      ).toISOString();

      const bookingMessage = [
        `Customer phone: ${formData.phone}`,
        `Service address: ${formData.address}`,
        `Additional message: ${formData.message || "None"}`,
      ].join("\n");

      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: id,
          requestedDate,
          message: bookingMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking could not be submitted.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Book Your Service
          </h1>
          <p className="text-slate-500 mt-2">
            Fill in your details to request a service.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-6xl mb-4">✅</div>

            <h2 className="text-2xl font-bold text-green-600">
              Booking Request Submitted!
            </h2>

            <p className="text-slate-500 mt-3">
              Thank you, {formData.name}. Your booking request has been saved successfully.
            </p>

            <p className="text-slate-500 mt-2">
              Your request is now pending provider confirmation.
            </p>

            <button
              onClick={() => navigate("/my-requests")}
              className="mt-6 bg-indigo-600 text-white px-7 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              View My Requests
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm p-8 space-y-5"
          >
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10 digit mobile number"
                maxLength="10"
                required
                className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Selected Service
              </label>
              <input
                type="text"
                value={selectedService?.title || selectedService?.service || "Selected service"}
                readOnly
                className="w-full border border-slate-200 rounded-lg p-3 bg-slate-50 text-slate-600"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Service Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="3"
                required
                className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-medium text-slate-700 mb-2">
                  Service Date
                </label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any special instructions?"
                rows="3"
                className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ServiceRequest;
