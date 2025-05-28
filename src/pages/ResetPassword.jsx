import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('https://vercel-backend-66m8.onrender.com/api/auth/reset-password', form);
      setMessage(res.data.message);
      setSuccess(true);
      setForm({ email: '', otp: '', newPassword: '' });

      // ✅ Redirect to login after short delay (e.g., 2.5 seconds)
      setTimeout(() => {
        navigate('/login');
      }, 2500);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Password reset failed');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          name="otp"
          value={form.otp}
          placeholder="OTP"
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          name="newPassword"
          type="password"
          value={form.newPassword}
          placeholder="New Password"
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Reset Password</button>
      </form>
      {message && (
        <p style={{ marginTop: 10, color: success ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
