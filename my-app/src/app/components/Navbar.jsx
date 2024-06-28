'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const { isAuthenticated,login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/problems';
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);
      if (response.ok) {
        console.log('Login successful:', result.message);
        login();
        setTimeout(() => {
          console.log('Redirecting to problems page');
          window.location.href = '/problems';
        }, 0);
      } 
      else {
        console.log('Login failed:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 z-50 p-4 text-white text-lg flex items-center">
        <button
          onClick={handleLoginShow}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-blue-800"
        >
          Sign In
        </button>
        <button
          onClick={handleRegisterShow}
          className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-gray-800"
        >
          Sign Up
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm">
            <strong>Login</strong>
            <form onSubmit={handleLoginSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-800"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleLoginClose}
                className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-gray-800"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm">
            <strong>Register</strong>
            <form onSubmit={handleRegisterSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-800"
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleRegisterClose}
                className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-gray-800"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;