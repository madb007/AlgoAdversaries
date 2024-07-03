'use client'

import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { Problem,DBProblem } from '@/app/utils/types/problemStructure'
import { useEffect, useState } from "react";
import { firestore } from '@/app/firebase/firebase';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import {useAuth} from '@/app/context/AuthContext';
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";


type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

//Code to get and display Problem Descriptions
const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem,_solved }) => {
	const {currentProblem,loading,problemDifficultyClass} = useGetCurrentProblem(problem.id);
	const {starred,solved,setData} = useGetUserDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);
	const {user} = useAuth();

	const handleStar = async() =>{
		if(updating) return;
		setUpdating(true);
		if(!starred){
			const userRef = doc(firestore,"users",user.email);
			await updateDoc(userRef,{starredProblems: arrayUnion(problem.id)})
			setData((prev)=>({...prev,starred:true}));
		}
		else{
			const userRef = doc(firestore,"users",user.email);
			await updateDoc(userRef,{starredProblems: arrayRemove(problem.id)})
			setData((prev)=>({...prev,starred:false}));
		}
		setUpdating(false);
	}
	return (
		<div className='text-white'>
			<div className='flex px-0 py-4 scrollbar'>
				<div className='px-5'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg font-medium'>{problem.title}</div>
						</div>
						{!loading && currentProblem && (
							<div className='flex items-center mt-3'>
							<div className={`${problemDifficultyClass}inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize `}>
								{currentProblem.difficulty}
							</div>
							{(solved || _solved) && (
							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 check-icon'>
								<BsCheck2Circle />
							</div>
							)}
							<div className='cursor-pointer rounded p-[3px] ml-4 text-xl transition-colors duration-200' onClick={handleStar}>
								{starred && !updating && <AiFillStar className='text-yellow-500'/>}
								{!starred && !updating && <TiStarOutline />}
								{updating && <AiOutlineLoading3Quarters className="animate-spin"/>}
								
							</div>
						</div>
						)}
						
						<div className='text-sm'>
							<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }}></div>
						</div>
						<div className='mt-4'>
							{problem.examples.map((example, index) => (
								<div key={example.id}>
									<p className='font-medium text-white '>Example {index + 1}: </p>
									{example.img && <img src={example.img} alt='' className='mt-3' />}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong> {example.inputText}
											<br />
											<strong>Output:</strong>
											{example.outputText} <br />
											{example.explanation && (
												<>
													<strong>Explanation:</strong> {example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>
						<div className='my-5'>
							<div className='text-lg font-medium'>Constraints:</div>
							<ul className='ml-5 list-disc'>
								<div dangerouslySetInnerHTML={{ __html: problem.constraints }}></div>	
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemDescription;

function useGetCurrentProblem(problemId: string){
	const [currentProblem,setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading,setLoading] = useState<boolean>(true);
	const [problemDifficultyClass,setProblemDifficultyClass] = useState<string>("");
	useEffect(()=>{
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore,"problems",problemId);
			const docSnap = await getDoc(docRef);
			if(docSnap.exists()){
				const problem = docSnap.data();
				setCurrentProblem({id:docSnap.id,...problem} as DBProblem);
				setProblemDifficultyClass(
					problem.difficulty === "Easy" ? "bg-green-500 text-green-500": problem.difficulty === "Medium" ? "bg-yellow-500 text-yellow-500": "bg-red-500 text-red-500"
				)			
			}
			setLoading(false);
		};
		getCurrentProblem();
	},[problemId]) 
	return {currentProblem,loading,problemDifficultyClass};
}

function useGetUserDataOnProblem(problemId:string){
	const [data,setData] = useState({starred:false,solved:false});
	const {user} = useAuth();

	useEffect(()=>{
		const getUserDataOnProblem = async () => {
			const userRef = doc(firestore,"users",user.email);
			const userSnap = await getDoc(userRef);
			if(userSnap.exists()){
				const data = userSnap.data();
				const {solvedProblems,starredProblems} = data;
				setData({
					starred: starredProblems.includes(problemId),
					solved:solvedProblems.includes(problemId),
				})
			}

		}
		if(user) getUserDataOnProblem();
		return () => setData({starred: false,solved: false});
	},[problemId,user])

	return {...data,setData};
}