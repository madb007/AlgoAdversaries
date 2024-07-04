'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsCheckCircle, BsYoutube } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from '@/app/firebase/firebase';
import { DBProblem } from '../utils/types/problemStructure';
import { useAuth } from '@/app/context/AuthContext';
import TextGenerator from '@/app/components/TextGenerator';
import Modal from '@/app/components/Modal';

type ProblemTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
    loadingProblems: boolean;
};

const ProblemTable: React.FC<ProblemTableProps> = ({ setLoadingProblems, loadingProblems }) => {
    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems(setLoadingProblems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSolution, setSelectedSolution] = useState<string | null>(null);

    const openModal = (solution: string) => {
        setSelectedSolution(solution);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSolution(null);
    };
    return (
        <>
            {!loadingProblems ? (
                <div>
                    <h1
                        className='text-2xl text-center text-white dark:text-white font-medium uppercase mt-10 mb-5'>
                        Problems
                    </h1>

                    <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
                        <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
                            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
                                <tr>
                                    <th scope='col' className='px-1 py-3 w-0 font-medium'>
                                        Status
                                    </th>
                                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                        Title
                                    </th>
                                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                        Difficulty
                                    </th>

                                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                        Category
                                    </th>
                                    <th scope='col' className='px-6 py-3 w-0 font-medium'>
                                        Solution
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-white'>
                                {problems.map((problem, idx) => {
                                    const difficultyColor = problem.difficulty === "Easy" ? "text-green-500" : problem.difficulty === "Medium" ? "text-yellow-500" : "text-red-600";
                                    return (
                                        <tr key={problem.id} className={`${idx % 2 === 1 ? 'bg-black' : ''}`}>
                                            <th className='px-2 py-4 font-medium whitespace-nowrap text-green-500'>
                                                {solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={'18'} width='18' />}
                                            </th>
                                            <td className='px-6 py-4'>
                                                <Link className='hover:text-blue-600 cursor-pointer' href={`/problem/${problem.id}`}>
                                                    {problem.title}
                                                </Link>
                                            </td>
                                            <td className={`px-6 py-4 ${difficultyColor}`}>
                                                {problem.difficulty}
                                            </td>
                                            <td className={`px-6 py-4`}>
                                                {problem.category}
                                            </td>
                                            <td className={`px-6 py-4`}>
                                                {problem.solution ? (
                                                    <GiArtificialIntelligence
                                                        fontSize={"18"}
                                                        className="cursor-pointer hover:text-green-500"
                                                        onClick={() => openModal(problem.solution!)}
                                                    />
                                                ) : (
                                                    <p className='text-gray-500'>No Solution</p>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
                    {[...Array(10)].map((_, idx) => (
                        <LoadingSkeleton key={idx} />
                    ))}
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedSolution && (
                    <TextGenerator text={selectedSolution} />
                )}
            </Modal>
        </>
    );
};

export default ProblemTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            const loadedProblems: DBProblem[] = [];

            querySnapshot.forEach((doc) => {
                loadedProblems.push({ id: doc.id, ...doc.data() } as DBProblem);
            });

            setProblems(loadedProblems);
            setLoadingProblems(false);
        };
        getProblems();
    }, [setLoadingProblems]);

    return problems;
}

function useGetSolvedProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const { user } = useAuth()
    useEffect(() => {
        const getSolvedProblems = async () => {
            const userRef = doc(firestore, "users", user.email);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                setSolvedProblems(userDoc.data().solvedProblems);
            }
        }
        if (user) getSolvedProblems();
    }, [user])
    return solvedProblems;
}

const LoadingSkeleton = () => {
    return (
        <div className='flex items-center space-x-12 mt-4 px-6'>
            <div className='w-6 h-6 shrink-0 rounded-full bg-gray-900'></div>
            <div className='h-4 sm:w-52  w-32  rounded-full bg-gray-900'></div>
            <div className='h-4 sm:w-52  w-32 rounded-full bg-gray-900'></div>
            <div className='h-4 sm:w-52 w-32 rounded-full bg-gray-900'></div>
            <span className='sr-only'>Loading...</span>
        </div>
    );
};
