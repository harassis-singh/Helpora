
import { useEffect, useState } from 'react';
import './MyServices.css';

function MyServices() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: ''
  });

  const token = sessionStorage.getItem('helporaToken');

  // Load provider services
  const loadServices = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/services/my-services',
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not load services');
      }

      setServices(Array.isArray(data) ? data : data.services || []);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:5000/api/services',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not add service');
      }

      setMessage('Service added successfully!');

      setFormData({
        title: '',
        category: '',
        description: '',
        price: '',
        location: ''
      });

      loadServices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Edit service
  const editService = async (service) => {
    const title = window.prompt('Enter service title:', service.title);
    if (title === null) return;

    const category = window.prompt('Enter category:', service.category);
    if (category === null) return;

    const description = window.prompt(
      'Enter description:',
      service.description
    );
    if (description === null) return;

    const price = window.prompt('Enter price:', service.price);
    if (price === null) return;

    const location = window.prompt('Enter location:', service.location);
    if (location === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/services/${service._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            title,
            category,
            description,
            price: Number(price),
            location
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update service');
      }

      setMessage('Service updated successfully!');
      loadServices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Activate or deactivate service
  const toggleServiceStatus = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/services/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update service status');
      }

      setMessage(data.message);
      loadServices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this service?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/services/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not delete service');
      }

      setMessage('Service deleted successfully!');
      loadServices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>My Services</h1>
        <p>Manage the services you offer on Helpora.</p>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="service-form">
        <h2>Add New Service</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Service Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Service</button>
        </form>
      </div>

      <div className="services-list">
        <h2>Your Listed Services</h2>

        {services.length === 0 ? (
          <p>You haven't added any services yet.</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card" key={service._id}>
                <h3>{service.title}</h3>

                <p><strong>Category:</strong> {service.category}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <p><strong>Price:</strong> ₹{service.price}</p>
                <p><strong>Location:</strong> {service.location}</p>

                <p>
                  <strong>Status:</strong>{' '}
                  {service.isActive ? 'Active' : 'Inactive'}
                </p>

                <div className="service-actions">
                  <button
                    className="edit-button"
                    onClick={() => editService(service)}
                  >
                    Edit Service
                  </button>

                  <button
                    className="status-button"
                    onClick={() => toggleServiceStatus(service._id)}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyServices;
