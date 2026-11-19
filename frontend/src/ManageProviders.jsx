import { useEffect, useState } from 'react';
import './ManageProviders.css';

function ManageProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem('helporaToken');

  const fetchProviders = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/providers',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch providers');
      }

      setProviders(data.providers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const toggleStatus = async (id) => {
    setMessage('');
    setError('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/providers/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update provider');
      }

      setMessage(data.message);
      fetchProviders();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="manage-providers-page">
      <div className="manage-providers-header">
        <div>
          <h1>Manage Providers</h1>
          <p>View and manage registered service providers.</p>
        </div>

        <a href="/admin-dashboard">Back to Dashboard</a>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading providers...</p>
      ) : providers.length === 0 ? (
        <p>No providers registered yet.</p>
      ) : (
        <div className="providers-table-wrapper">
          <table className="providers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr key={provider._id}>
                  <td>{provider.name}</td>
                  <td>{provider.email}</td>
                  <td>
                    <span className={provider.isActive ? 'active-status' : 'inactive-status'}>
                      {provider.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={provider.isActive ? 'deactivate-btn' : 'activate-btn'}
                      onClick={() => toggleStatus(provider._id)}
                    >
                      {provider.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageProviders;