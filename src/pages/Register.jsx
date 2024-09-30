import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../features/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match!");
      return;
    }

    const newUser = { email, password };

    try {
      await dispatch(registerUser(newUser)).unwrap(); 
      
      window.alert('Registration successful! Please log in.');
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to register:', error); 
      window.alert('Registration failed. Please try again.'); 
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className="mt-1 block w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>

      {/* Link to Login */}
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-blue-500 hover:underline"> Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
