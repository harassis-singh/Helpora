
import { useEffect, useState } from 'react';
import './ManageServices.css';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    location: '',
    description: ''
  });

  const token = sessionStorage.getItem('helporaToken');

  const fetchServices = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/admin/services',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch services');
      }

      setServices(data.services || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setEditingId(service._id);
    setForm({
      title: service.title || '',
      category: service.category || '',
      price: service.price ?? '',
      location: service.location || '',
      description: service.description || ''
    });
    setMessage('');
    setError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({
      title: '',
      category: '',
      price: '',
      location: '',
      description: ''
    });
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update service');
      }

      setMessage(data.message || 'Service updated successfully');
      handleCancelEdit();
      await fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update service status');
      }

      setMessage(data.message);
      await fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete service');
      }

      setMessage(data.message);
      await fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="manage-services-page">
      <div className="services-header">
        <div>
          <h1>Manage Services</h1>
          <p>View and manage services listed by providers.</p>
        </div>

        <a href="/admin-dashboard">Back to Dashboard</a>
      </div>

      {message && <p className="service-success">{message}</p>}
      {error && <p className="service-error">{error}</p>}

      {editingId && (
        <div className="services-list-card">
          <h2>Edit Service</h2>

          <form onSubmit={handleUpdateService}>
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="Service title"
              required
            />

            <input
              name="category"
              value={form.category}
              onChange={handleFormChange}
              placeholder="Category"
              required
            />

            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleFormChange}
              placeholder="Price"
              required
            />

            <input
              name="location"
              value={form.location}
              onChange={handleFormChange}
              placeholder="Location"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Service description"
              rows="3"
            />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="services-list-card">
        <h2>All Listed Services</h2>

        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services listed yet.</p>
        ) : (
          <div className="services-table-wrapper">
            <table className="services-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.title}</td>
                    <td>{service.provider?.name || 'Unknown'}</td>
                    <td>{service.category}</td>
                    <td>₹{service.price}</td>
                    <td>{service.location}</td>
                    <td>
                      <span
                        className={
                          service.isActive
                            ? 'service-active-status'
                            : 'service-inactive-status'
                        }
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="service-action-buttons">
                        <button
                          className="service-edit-btn"
                          onClick={() => handleEdit(service)}
                        >
                          Edit
                        </button>

                        <button
                          className="service-toggle-btn"
                          onClick={() => handleToggleStatus(service._id)}
                        >
                          {service.isActive ? 'Deactivate' : 'Activate'}
                        </button>

                        <button
                          className="service-delete-btn"
                          onClick={() => handleDeleteService(service._id)}
                        >
                          Delete
                        </button>
                      </div>
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

export default ManageServices;
