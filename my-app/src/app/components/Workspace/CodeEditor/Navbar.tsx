import React from 'react';
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";

type NavbarProps = {
  setLanguage: (language: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ setLanguage }) => {
  return (
    <div className='flex items-center justify-between bg-gray-800 h-11 w-full'>
      <div className='flex items-center'>
        <select 
          className='flex cursor-pointer items-center focus:outline-none bg-gray-700  hover:bg-gray-800  px-2 py-1.5 text-xs text-white' 
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value='javascript'>JavaScript</option>
          <option value='cpp'>C++</option>
          <option value='python'>Python</option>
        </select>
      </div>

      <div className='flex items-center m-1'>
        <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group'>
          <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg m-4'>
            <AiOutlineSetting />
          </div>
        </button>

        <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group'>
          <div className='h-4 w-4 text-dark-gray-6 font-bold text-lg'>
            <AiOutlineFullscreen />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;