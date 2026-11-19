
import { useState } from 'react';
import './ProviderAuth.css';

function ProviderAuth() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const endpoint = isLogin ? 'login' : 'register';

      const response = await fetch(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            isLogin
              ? {
                  email: form.email,
                  password: form.password
                }
              : {
                  ...form,
                  role: 'provider'
                }
          )
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isLogin) {
        sessionStorage.setItem('helporaToken', data.token);

        sessionStorage.setItem(
          'helporaUser',
          JSON.stringify(data.user)
        );

        sessionStorage.setItem(
          'helporaRole',
          data.user.role
        );
      }

      setMessage(data.message);

      if (isLogin) {
        if (data.user.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else if (data.user.role === 'provider') {
          window.location.href = '/provider-dashboard';
        } else {
          sessionStorage.removeItem('helporaToken');
          sessionStorage.removeItem('helporaUser');
          sessionStorage.removeItem('helporaRole');
          setMessage('This login page is for providers and admins only.');
        }
      } else {
        setIsLogin(true);
      }

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Helpora<span>.</span></h1>

        <h2>
          {isLogin ? 'Provider / Admin Login' : 'Become a Provider'}
        </h2>

        <p>
          {isLogin
            ? 'Welcome back! Sign in to your account.'
            : 'Create your account and grow your business.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                required
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password (minimum 8 characters)"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Create Provider Account'}
          </button>
        </form>

        {message && (
          <p className="auth-message">{message}</p>
        )}

        <div className="auth-switch">
          {isLogin
            ? "Don't have an account? "
            : 'Already have an account? '}

          <span onClick={() => {
            setIsLogin(!isLogin);
            setMessage('');
          }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProviderAuth;
