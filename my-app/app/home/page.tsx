'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Topbar from '../components/Topbar';
import { doc, setDoc } from "firebase/firestore"; 
import { firestore } from '../firebase/firebase';
import ProblemTable from '../components/ProblemTable';

const ProblemsPage = () => {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [inputs, setInputs] = useState({
    id: '',
    title: '',
    difficulty: '',
    category: '',
    order: '', // Keeping order as string in the state
    solution: '',
  });
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert 'order' to number if it's numeric; otherwise, keep as string
    const parsedValue = name === 'order' ? (isNaN(Number(value)) ? value : Number(value)) : value;
    setInputs({
      ...inputs,
      [name]: parsedValue
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setDoc(doc(firestore, "problems", inputs.id), inputs);
      alert("Saved to database");
      setInputs({
        id: '',
        title: '',
        difficulty: '',
        category: '',
        order: '', 
        solution: '',
      });
      setShowForm(false); // Close the form after submission
    } catch (error) {
      console.error("Error saving to database", error);
      alert("Failed to save to database");
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <Topbar />

      <div className="container mx-auto mt-10">
        
          <ProblemTable loadingProblems={loadingProblems} setLoadingProblems={setLoadingProblems} />
      </div>

      {/* Button to toggle form visibility */}
      <button
        className="fixed top-20 z-50 right-center bg-gray-800 hover:text-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Problems (Beta)'}
      </button>

      {/* Conditional rendering of form based on showForm state */}
      {showForm && (
       <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
       <form className='p-6 flex flex-col max-w-sm gap-3 bg-white rounded-lg shadow-lg' onSubmit={handleSubmit}>
         <input onChange={handleInputChange} type='text' placeholder='Problem ID' name='id' value={inputs.id} />
         <input onChange={handleInputChange} type='text' placeholder='Title' name='title' value={inputs.title} />
         <input onChange={handleInputChange} type='text' placeholder='Difficulty' name='difficulty' value={inputs.difficulty} />
         <input onChange={handleInputChange} type='text' placeholder='Category' name='category' value={inputs.category} />
         <input onChange={handleInputChange} type='text' placeholder='Order' name='order' value={inputs.order.toString()} />
         <input onChange={handleInputChange} type='text' placeholder='Solution' name='solution' value={inputs.solution} />
         <button className='bg-gray-800 text-white py-2 rounded-lg' type='submit'>Save to DB</button>
         <button className="bg-gray-800 text-white py-2 rounded-lg" onClick={closeForm}>Close</button>
       </form>
     </div>
      )}
    </div>
  );
};


export default ProblemsPage;