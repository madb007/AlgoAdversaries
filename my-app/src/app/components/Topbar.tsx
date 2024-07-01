'use client'

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { BsList } from 'react-icons/bs';

type TopbarProps = {
    problemPage?: Boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        window.location.href = ('/');
    };


    return (
        <div>
            <div className="fixed top-0 left-0 right-0 z-50 p-4 text-white text-lg grid grid-cols-3 items-center">
                <div></div>
                <div className=" flex justify-center">
                    {problemPage && (
                        <Link
                            href='/home'
                            className='flex items-center gap-2 font-medium text-white cursor-pointer transparent px-3 py-2 rounded'
                        >

                            <BsList />
                            <span>Home</span>
                        </Link>
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="transparent text-white px-4 py-2 rounded transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>



            <div className="bg-[#000000] text-white py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img src="/favicon.ico" alt="AlgoAdversaries" className="w-12 h-12 mr-4" />
                    <h1 className="text-2xl font-bold items-center">AlgoAdversaries</h1>
                </div>
            </div>
        </div>
    );
};
export default Topbar;