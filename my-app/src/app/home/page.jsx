'use client'

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Topbar from '../components/Topbar';
import ParentTable from '../components/ParentTable';

const ProblemsPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);



  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Topbar/>

      <div className="container mx-auto mt-10">
        <ParentTable/>    
      </div>
    </div>
  );
};

export default ProblemsPage;