
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      sessionStorage.setItem("helporaToken", data.token);
      sessionStorage.setItem("helporaRole", data.user.role);
      sessionStorage.setItem("helporaUser", JSON.stringify(data.user));

      setMessage("Login successful!");

      setTimeout(() => {
        if (data.user.role === "customer") {
          navigate("/dashboard");
        } else if (data.user.role === "provider") {
          navigate("/provider-dashboard");
        } else if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        }
      }, 700);

    } catch (error) {
      setMessage(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5faf7] text-[#173b30] flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-[#d6ebe1] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#173b30]">
          Welcome Back!
        </h2>

        <p className="text-[#526b61] text-center mt-2 mb-8">
          Login to your Helpora account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#173b30] font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-[#f5faf7] border border-[#c6e8d8] text-[#173b30] placeholder:text-[#71877d] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#009966]"
            />
          </div>

          <div>
            <label className="block text-[#173b30] font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full bg-[#f5faf7] border border-[#c6e8d8] text-[#173b30] placeholder:text-[#71877d] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#009966]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#009966] text-white py-3 rounded-lg font-semibold hover:bg-[#007a55] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="text-center text-[#007a55] font-medium mt-4">
            {message}
          </p>
        )}

        <p className="text-center text-[#526b61] mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#007a55] font-semibold hover:text-[#064e3b] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
