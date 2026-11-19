
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Customer pages
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import SearchServices from "./Pages/SearchServices";
import CustomerDashboard from "./Pages/CustomerDashboard";
import MyRequest from "./Pages/MyRequest";
import ProviderDetails from "./Pages/ProviderDetails";
import ServiceRequest from "./Pages/ServiceRequest";
import NotFound from "./Pages/NotFound";

// Provider pages
import ProviderAuth from "./ProviderAuth";
import ProviderDashboard from "./ProviderDashboard";
import MyServices from "./MyServices";
import ProviderProfile from "./ProviderProfile";
import CustomerRequests from "./CustomerRequests";

// Admin pages
import AdminDashboard from "./AdminDashboard";
import ManageProviders from "./ManageProviders";
import ManageCategories from "./ManageCategories";
import ManageServices from "./ManageServices";
import ManageUsers from "./ManageUsers";

function CustomerLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function ProtectedRole({ role, children }) {
  const token = sessionStorage.getItem("helporaToken");
  const userRole = sessionStorage.getItem("helporaRole");

  if (!token || userRole !== role) {
    return <Navigate to={role === "customer" ? "/login" : "/provider-login"} replace />;
  }

  return children;
}

function AppRoutes() {
  const location = useLocation();

  const customerPaths = [
    "/",
    "/about",
    "/register",
    "/login",
    "/search",
  ];

  const isCustomerPublicPage = customerPaths.includes(location.pathname);

  return (
    <>
      {isCustomerPublicPage && <Navbar />}

      <Routes>
        {/* Customer public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchServices />} />
        <Route path="/provider/:id" element={<ProviderDetails />} />
        <Route path="/service-request/:id" element={<ServiceRequest />} />

        {/* Customer protected pages */}
        <Route path="/dashboard" element={
          <ProtectedRole role="customer">
            <CustomerDashboard />
          </ProtectedRole>
        } />

        <Route path="/my-requests" element={
          <ProtectedRole role="customer">
            <MyRequest />
          </ProtectedRole>
        } />

        {/* Provider authentication */}
        <Route path="/provider-login" element={<ProviderAuth />} />

        {/* Provider protected pages */}
        <Route path="/provider-dashboard" element={
          <ProtectedRole role="provider">
            <ProviderDashboard />
          </ProtectedRole>
        } />

        <Route path="/my-services" element={
          <ProtectedRole role="provider">
            <MyServices />
          </ProtectedRole>
        } />

        <Route path="/my-profile" element={
          <ProtectedRole role="provider">
            <ProviderProfile />
          </ProtectedRole>
        } />

        <Route path="/customer-requests" element={
          <ProtectedRole role="provider">
            <CustomerRequests />
          </ProtectedRole>
        } />

        {/* Admin protected pages */}
        <Route path="/admin-dashboard" element={
          <ProtectedRole role="admin">
            <AdminDashboard />
          </ProtectedRole>
        } />

        <Route path="/manage-providers" element={
          <ProtectedRole role="admin">
            <ManageProviders />
          </ProtectedRole>
        } />

        <Route path="/manage-categories" element={
          <ProtectedRole role="admin">
            <ManageCategories />
          </ProtectedRole>
        } />

        <Route path="/manage-services" element={
          <ProtectedRole role="admin">
            <ManageServices />
          </ProtectedRole>
        } />

        <Route path="/manage-users" element={
          <ProtectedRole role="admin">
            <ManageUsers />
          </ProtectedRole>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {isCustomerPublicPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
