
import { useEffect, useState } from "react";

function MyRequest() {
  const [activeTab, setActiveTab] = useState("All");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = sessionStorage.getItem("helporaToken");

        const response = await fetch(
          "http://localhost:5000/api/requests/customer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch requests");
        }

        setRequests(data.requests || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests =
    activeTab === "All"
      ? requests
      : requests.filter((item) => item.status === activeTab);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-green-100 text-green-700",
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            My Requests
          </h1>
          <p className="text-slate-500 mt-2">
            Manage and track all your service bookings.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Total Requests</p>
            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {requests.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {requests.filter((r) => r.status === "Pending").length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-slate-500">Completed</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {requests.filter((r) => r.status === "Completed").length}
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["All", "Pending", "Accepted", "Rejected", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-indigo-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Requests */}
        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center">
            Loading your requests...
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl p-12 text-center text-red-600">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">
                        {request.service?.title || "Service"}
                      </h3>

                      <p className="text-slate-500 mt-2">
                        Provider: {request.provider?.name || "Provider"}
                      </p>

                      <p className="text-slate-500 mt-1">
                        Requested Date: {formatDate(request.requestedDate)}
                      </p>

                      <p className="text-slate-500 mt-1">
                        Location: {request.service?.location || "Not available"}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="text-xl font-bold text-slate-800 mb-3">
                        ₹{request.service?.price ?? "N/A"}
                      </p>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          statusColors[request.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <h3 className="text-xl font-semibold text-slate-700">
                  No Requests Found
                </h3>
                <p className="text-slate-500 mt-2">
                  You don't have any {activeTab.toLowerCase()} requests.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRequest;
