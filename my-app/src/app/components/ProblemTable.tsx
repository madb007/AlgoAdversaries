import React from 'react';
import { problems } from '../problems/problems';
import { BsCheckCircle, BsYoutube} from 'react-icons/bs';
import {GiArtificialIntelligence} from 'react-icons/gi'
import Link from 'next/link';

type ProblemTableProps = {};

const ProblemTable: React.FC<ProblemTableProps> = () => {
  return (
    <>
      {problems.length > 0 && (
        <tbody className='text-white'>
          {problems.map((doc, idx) => {
            const difficultyColor = doc.difficulty === "Easy" ? "text-green-500" : doc.difficulty === "Medium" ? "text-yellow-500" : "text-red-600";
            return (
              <tr key={doc.id} className={`${idx % 2 === 1 ? 'bg-black' : ''}`}>
                <th className='px-2 py-4 font-medium whitespace-nowrap text-green-500'>
                  <BsCheckCircle fontSize={'18'} width='18' />
                </th>
                <td className='px-6 py-4'>
                  <Link className='hover:text-blue-600 cursor-pointer' href={`/problem/${doc.id}`}>
                    {doc.title}
                  </Link>
                </td>
                <td className={`px-6 py-4 ${difficultyColor}`}>
                  {doc.difficulty}
                </td>
                <td className={`px-6 py-4`}>
                  {doc.category}
                </td>
                <td className={`px-6 py-4`}>
                  {doc.solution ? (
                    <GiArtificialIntelligence fontSize={"18"} className="cursor-pointer hover:text-green-500" />
                  ) : (
                    <p className='text-gray-500'>No Solution</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      )}
    </>
  );
}

export default ProblemTable;