
import { useEffect, useState } from 'react';
import './ManageCategories.css';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const token = sessionStorage.getItem('helporaToken');

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch categories');
      }

      setCategories(data.categories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to add category');
      }

      setMessage(data.message);
      setName('');
      setDescription('');
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditClick = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || '');
    setError('');
    setMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name, description })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update category');
      }

      setMessage(data.message);
      handleCancelEdit();
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete category');
      }

      setMessage(data.message);
      await fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="manage-categories-page">
      <div className="categories-header">
        <div>
          <h1>Manage Categories</h1>
          <p>Add and manage service categories on Helpora.</p>
        </div>
        <a href="/admin-dashboard">Back to Dashboard</a>
      </div>

      {message && <p className="category-success">{message}</p>}
      {error && <p className="category-error">{error}</p>}

      <div className="category-form-card">
        <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>

        <form onSubmit={editingId ? handleUpdateCategory : handleAddCategory}>
          <label>Category Name</label>
          <input
            type="text"
            placeholder="e.g. Home Cleaning"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />

          <div className="category-form-actions">
            <button type="submit">
              {editingId ? 'Save Changes' : 'Add Category'}
            </button>

            {editingId && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="category-list-card">
        <h2>All Categories</h2>

        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories added yet.</p>
        ) : (
          <div className="category-table-wrapper">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description || 'No description'}</td>
                    <td>
                      <div className="category-action-buttons">
                        <button
                          type="button"
                          className="category-edit-btn"
                          onClick={() => handleEditClick(category)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="category-delete-btn"
                          onClick={() => handleDeleteCategory(category._id)}
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

export default ManageCategories;
