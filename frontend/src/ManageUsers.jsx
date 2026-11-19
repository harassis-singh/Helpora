
import { useEffect, useState } from 'react';
import './ManageUsers.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const token = sessionStorage.getItem('helporaToken');

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/users',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch users');
      }

      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update user status');
      }

      setMessage(data.message);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="manage-users-page">
      <div className="users-header">
        <div>
          <h1>Manage Users</h1>
          <p>View and manage registered customers and providers.</p>
        </div>

        <a href="/admin-dashboard">Back to Dashboard</a>
      </div>

      {message && <p className="user-success">{message}</p>}
      {error && <p className="user-error">{error}</p>}

      <div className="users-list-card">
        <h2>Registered Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Account Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="user-role">
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={
                        user.isActive
                          ? 'user-active-status'
                          : 'user-inactive-status'
                      }>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={
                          user.isActive
                            ? 'user-deactivate-btn'
                            : 'user-activate-btn'
                        }
                        onClick={() => handleToggleStatus(user._id)}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
