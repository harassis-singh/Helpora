import { useEffect, useState } from 'react';
import './AdminDashboard.css';
import ManageServices from './ManageServices';
import ManageUsers from './ManageUsers';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalCustomers: 0,
    totalServices: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = sessionStorage.getItem('helporaToken');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/admin/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Unable to load dashboard');
        }

        setStats(data.statistics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem('helporaToken');
    window.location.href = '/';
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Helpora<span>.</span></h2>
        <p>ADMIN PANEL</p>

        <a className="active">Dashboard</a>
        <a href="/manage-providers">Manage Providers</a>
       <a href="/manage-categories">Manage Categories</a>
        <a href="/manage-services">Manage Services</a>
       <a href="/manage-users">Manage Users</a>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Helpora administration panel.</p>
          </div>

          <button onClick={handleLogout}>Logout</button>
        </header>

        {error && <p className="admin-error">{error}</p>}

        <section className="admin-stats">
          <div className="admin-stat-card">
            <p>Total Users</p>
            <h2>{loading ? '...' : stats.totalUsers}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Total Providers</p>
            <h2>{loading ? '...' : stats.totalProviders}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Total Customers</p>
            <h2>{loading ? '...' : stats.totalCustomers}</h2>
          </div>

          <div className="admin-stat-card">
            <p>Total Services</p>
            <h2>{loading ? '...' : stats.totalServices}</h2>
          </div>
        </section>

        <section className="admin-content">
          <h2>Helpora Overview</h2>
          <p>
            Manage providers, customers, services and categories
            from this dashboard.
          </p>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;