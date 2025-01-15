'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { isAuthenticated, login, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async(event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email,password);
      setShowLogin(false);
      router.push('/home');
    } catch(err: any) {
      toast.error(err.message);
      console.log(err.message);
    } 
    
  };

  const handleRegisterSubmit = async(event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await register(email,password);
      setShowRegister(false);
      router.push('/home');
    } catch(err: any) {
      toast.error(err.message);
      console.log(err.message);
    } 
  };

 return (
    <>
      <div className="fixed top-0 right-0 z-50 p-4 text-white text-lg flex items-center">
        <button
          onClick={() => setShowLogin(true)}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-blue-800"
        >
          Sign In
        </button>
        <button
          onClick={() => setShowRegister(true)}
          className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-gray-800"
        >
          Sign Up
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <strong className="text-xl">Login</strong>
              <button
                onClick={() => setShowLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-800"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <strong className="text-xl">Register</strong>
              <button
                onClick={() => setShowRegister(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleRegisterSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-800"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 