import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
	return (
		<div className='text-white'>
			<div className='flex px-0 py-4 scrollbar'>
				<div className='px-5'>
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg font-medium'>1. Two Sum</div>
						</div>
						<div className='flex items-center mt-3'>
							<div className='inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize easy-label'>
								Easy
							</div>
							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 check-icon'>
								<BsCheck2Circle />
							</div>
							<div className='cursor-pointer rounded p-[3px] ml-4 text-xl transition-colors duration-200'>
								<TiStarOutline />
							</div>
						</div>
						<div className='text-sm'>
							<p className='mt-3'>
								Given an array of integers <code>nums</code> and an integer <code>target</code>, return
								<em>indices of the two numbers such that they add up to</em> <code>target</code>.
							</p>
							<p className='mt-3'>
								You may assume that each input would have <strong>exactly one solution</strong>, and you
								may not use the same element twice.
							</p>
							<p className='mt-3'>You can return the answer in any order.</p>
						</div>
						<div className='mt-4'>
							<div>
								<p className='font-medium'>Example 1: </p>
								<div className='example-card'>
									<pre>
										<strong>Input: </strong> nums = [2,7,11,15], target = 9{" "}
										<br />
										<strong>Output:</strong> [0,1] <br />
										<strong>Explanation:</strong>Because nums[0] + nums[1] == 9, we return [0, 1].
									</pre>
								</div>
							</div>
							<div>
								<p className='font-medium'>Example 2: </p>
								<div className='example-card'>
									<pre>
										<strong>Input: </strong> nums = [3,2,4], target = 6{" "}
										<br />
										<strong>Output:</strong> [1,2] <br />
										<strong>Explanation:</strong>Because nums[1] + nums[2] == 6, we return [1, 2].
									</pre>
								</div>
							</div>
							<div>
								<p className='font-medium'>Example 3: </p>
								<div className='example-card'>
									<pre>
										<strong>Input: </strong> nums = [3,3], target = 6
										<br />
										<strong>Output:</strong> [0,1] <br />
									</pre>
								</div>
							</div>
						</div>
						<div className='my-5'>
							<div className='text-lg font-medium'>Constraints:</div>
							<ul className='ml-5 list-disc'>
								<li className='mt-2'>
									<code>2 ≤ nums.length ≤ 10</code>
								</li>
								<li className='mt-2'>
									<code>-10 ≤ nums[i] ≤ 10</code>
								</li>
								<li className='mt-2'>
									<code>-10 ≤ target ≤ 10</code>
								</li>
								<li className='mt-2 text-sm'>
									<strong>Only one valid answer exists.</strong>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemDescription;