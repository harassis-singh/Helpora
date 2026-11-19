
import { useEffect, useState } from 'react';
import './ProviderProfile.css';

function ProviderProfile() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('helporaToken');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/providers/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not load profile');
      }

      setProfile(data.user);
      setName(data.user.name);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/providers/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not update profile');
      }

      setProfile(data.user);
      setName(data.user.name);
      setEditing(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  if (!profile) {
    return <p>{message || 'Unable to load profile.'}</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p className="profile-subtitle">
          Manage your provider account details
        </p>

        <div className="profile-avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        {message && <p className="profile-message">{message}</p>}

        {editing ? (
          <form onSubmit={updateProfile}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input type="email" value={profile.email} disabled />

            <div className="profile-actions">
              <button type="submit">Save Changes</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setName(profile.name);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{profile.name}</strong>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Role</span>
              <strong>{profile.role}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Status</span>
              <strong>{profile.isActive ? 'Active' : 'Inactive'}</strong>
            </div>

            <button
              className="edit-profile-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProviderProfile;
