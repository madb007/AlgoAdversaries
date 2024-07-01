import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { Problem } from '@/app/utils/types/problemStructure'

type ProblemDescriptionProps = {
	problem: Problem;
};

//Code to get and display Problem Descriptions
const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
	return (
		<div className='text-white'>
			<div className='flex px-0 py-4 scrollbar'>
				<div className='px-5'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg font-medium'>{problem.title}</div>
						</div>
						<div className='flex items-center mt-3'>
							<div className='inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize easy-label'>
								{problem.difficulty}
							</div>
							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 check-icon'>
								<BsCheck2Circle />
							</div>
							<div className='cursor-pointer rounded p-[3px] ml-4 text-xl transition-colors duration-200'>
								<TiStarOutline />
							</div>
						</div>
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