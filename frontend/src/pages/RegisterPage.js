import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    incorporationType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400">
            <option value="user">General User</option>
            <option value="business">Business</option>
          </select>
          {form.role === 'business' && (
            <input name="incorporationType" value={form.incorporationType}
              onChange={handleChange} placeholder="Incorporation Type"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          )}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
