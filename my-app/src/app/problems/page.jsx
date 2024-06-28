'use client'

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProblemsPage = () => {
  const { isAuthenticated,logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
        window.location.href = '/';
    }
  }, [isAuthenticated]);

  const handleLogout  = () => {
    logout();
    window.location.href = '/'; 
  };


  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="fixed top-0 right-0 z-50 p-4 text-white text-lg flex items-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 border border-red-600 text-white px-4 py-2 rounded ml-4 transition duration-300 hover:bg-red-800"
          >
            Logout
          </button>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl font-bold">Problems Page</h1>
        </div>
      </div>
    </>
  );
};

export default ProblemsPage;