import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
           type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;