// src/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useDispatch } from 'react-redux'; // Import useDispatch
import { registerUser } from '../features/userSlice'; // Import the registerUser action

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Create a dispatch function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { email, password };

    try {
      await dispatch(registerUser(newUser)).unwrap(); // Dispatch the action and wait for it to complete
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Failed to register:', error); // Log error if registration fails
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>.</p>
      </div>
    </div>
  );
};

export default RegisterForm;
