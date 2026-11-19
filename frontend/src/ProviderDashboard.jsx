import { useEffect, useState } from 'react';
import './ProviderDashboard.css';
import CustomerRequests from './CustomerRequests';

function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = sessionStorage.getItem('helporaToken');
  const handleLogout = () => {
  sessionStorage.removeItem('helporaToken');
  window.location.href = '/';
};

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/services/my-services',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Could not fetch services');
        }

        setServices(Array.isArray(data) ? data : data.services || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  const totalServices = services.length;
  const activeServices = services.filter(service => service.isActive).length;

  return (
    <div className="provider-dashboard">
      <aside className="provider-sidebar">
        <h2>Helpora<span>.</span></h2>
        <p className="sidebar-label">PROVIDER MENU</p>

        <a className="active">Dashboard</a>
        <a href="/my-services">My Services</a>
        <a href="/customer-requests">Customer Requests</a>
        <a href="/customer-requests">Request History</a>
        <a href="/my-profile">My Profile</a>
      </aside>

      <main className="provider-main">
        <header className="provider-header">
          <div>
            <h1>Provider Dashboard</h1>
            <p>Welcome back! Here's an overview of your business.</p>
          </div>
         <div className="header-actions">
  <button className="profile-button">Provider</button>
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
</div>
        </header>

        {error && <p>{error}</p>}

        <section className="dashboard-stats">
          <div className="stat-card">
            <p>Total Services</p>
            <h2>{loading ? '...' : totalServices}</h2>
          </div>

          <div className="stat-card">
            <p>Active Services</p>
            <h2>{loading ? '...' : activeServices}</h2>
          </div>

          <div className="stat-card">
            <p>New Requests</p>
            <h2>0</h2>
          </div>

          <div className="stat-card">
            <p>Completed Jobs</p>
            <h2>0</h2>
          </div>
        </section>

        <section className="dashboard-content">
          <h2>Recent Customer Requests</h2>
          <div className="empty-state">
            <h3>No requests yet</h3>
            <p>New customer requests will appear here.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProviderDashboard;