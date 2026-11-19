import { Link } from "react-router-dom";

function CustomerDashboard() {

  const customer = {
    name: "Priya Ganjvani",
    email: "priya@example.com",
    phone: "9876543210",
  };

  const stats = [
    {
      title: "Total Bookings",
      count: 5,
      icon: "📋",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Requests",
      count: 2,
      icon: "⏳",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Completed Services",
      count: 3,
      icon: "✅",
      color: "bg-green-50 text-green-600",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      service: "Home Cleaning",
      provider: "Rahul Sharma",
      date: "12 Nov 2026",
      price: "₹800",
      status: "Pending",
    },
    {
      id: 2,
      service: "AC Repair",
      provider: "Amit Patel",
      date: "10 Nov 2026",
      price: "₹1200",
      status: "Completed",
    },
  ];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Welcome Section */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back, {customer.name}! 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your services and track your bookings.
          </p>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-slate-500 font-medium">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-slate-800 mt-3">
                    {item.count}
                  </h2>
                </div>

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.color}`}>
                  {item.icon}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Quick Actions */}

        <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">

          <h2 className="text-xl font-bold text-slate-800 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <Link
              to="/search"
              className="bg-indigo-600 text-white p-5 rounded-xl text-center hover:bg-indigo-700 transition"
            >
              <span className="text-2xl">🔍</span>
              <p className="font-semibold mt-2">
                Find Services
              </p>
            </Link>

            <Link
              to="/my-requests"
              className="bg-indigo-50 text-indigo-700 p-5 rounded-xl text-center hover:bg-indigo-100 transition"
            >
              <span className="text-2xl">📋</span>
              <p className="font-semibold mt-2">
                My Requests
              </p>
            </Link>

            <Link
              to="/search"
              className="bg-indigo-50 text-indigo-700 p-5 rounded-xl text-center hover:bg-indigo-100 transition"
            >
              <span className="text-2xl">➕</span>
              <p className="font-semibold mt-2">
                Book New Service
              </p>
            </Link>

          </div>

        </div>

        {/* Recent Bookings */}

        <div className="bg-white p-6 rounded-2xl shadow-sm mb-10">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Bookings
            </h2>

            <Link
              to="/my-requests"
              className="text-indigo-600 font-semibold hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">

            {recentBookings.map((booking) => (

              <div
                key={booking.id}
                className="border border-slate-100 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4"
              >

                <div>

                  <h3 className="font-bold text-slate-800 text-lg">
                    {booking.service}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    Provider: {booking.provider}
                  </p>

                  <p className="text-slate-500 mt-1">
                    Date: {booking.date}
                  </p>

                </div>

                <div className="md:text-right">

                  <p className="font-bold text-slate-800 text-lg mb-3">
                    {booking.price}
                  </p>

                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[booking.status]}`}>
                    {booking.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Customer Profile */}

        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-xl font-bold text-slate-800 mb-5">
            My Profile
          </h2>

          <div className="flex flex-col sm:flex-row gap-5 items-center">

            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>

            <div className="text-center sm:text-left">

              <h3 className="font-bold text-lg text-slate-800">
                {customer.name}
              </h3>

              <p className="text-slate-500 mt-1">
                {customer.email}
              </p>

              <p className="text-slate-500 mt-1">
                +91 {customer.phone}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerDashboard;