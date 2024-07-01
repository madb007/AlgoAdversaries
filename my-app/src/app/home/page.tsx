'use client'

import { useEffect,useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Topbar from '../components/Topbar';
import ParentTable from '../components/ParentTable';

const ProblemsPage = () => {
  const [inputs,setInputs] = useState({
    id:'',
    title:'',
    difficulty:'',
    category:'',
    order:0,
    solution:'',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputs({
      ...inputs,
      [e.target.name] : e.target.value
    })
  }
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
      <form className = 'p-6 flex flex-col max-w-sm gap-3'>
        <input onChange={handleInputChange} type='text' placeholder='problem id' name='id'/>
        <input onChange={handleInputChange}type='text' placeholder='title' name='id'/>
        <input onChange={handleInputChange}type='text' placeholder='difficulty' name='id'/>
        <input onChange={handleInputChange}type='text' placeholder='category' name='id'/>
        <input onChange={handleInputChange}type='number' placeholder='order' name='id'/>
        <input onChange={handleInputChange}type='text' placeholder='solution' name='id'/>
        <button className='bg-white'>Savetodb</button>
      </form>
      
    </div>
  );
};

export default ProblemsPage;