import assert from "assert";
import { Problem } from "../types/problemStructure";

export const threeSumHandler = (fn: any) => {
    try {
        const tests = [
            [-1,0,1,2,-1,-4],
            [],
            [0],
            [0,0,0]
        ];
        const answers = [
            [[-1,-1,2],[-1,0,1]],
            [],
            [],
            [[0,0,0]]
        ];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.deepStrictEqual(result.sort(), answers[i].sort());
        }
        return true;
    } catch (error: any) {
        console.log("Error from threeSumHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeThreeSumJS = `
function threeSum(nums) {
    // Write your code here
}`;

export const threeSum: Problem = {
    id: "3sum",
    title: "9. 3Sum",
    problemStatement: `<p class='mt-3'>Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
    <p>Notice that the solution set must not contain duplicate triplets.</p>`,
    examples: [
        {
            id: 0,
            inputText: "nums = [-1,0,1,2,-1,-4]",
            outputText: "[[-1,-1,2],[-1,0,1]]",
            explanation: "The triplets are:\n(-1, 0, 1) and (-1, -1, 2).\nNote that (-1, 1, 0) is considered a duplicate of (-1, 0, 1)."
        },
        {
            id: 1,
            inputText: "nums = []",
            outputText: "[]",
        },
        {
            id: 2,
            inputText: "nums = [0]",
            outputText: "[]",
        },
    ],
    constraints: `<li class='mt-2'>0 ≤ nums.length ≤ 3000</li>
<li class='mt-2'>-10^5 ≤ nums[i] ≤ 10^5</li>`,
    starterCode: starterCodeThreeSumJS,
    handlerFunction: threeSumHandler,
    difficulty: "Medium",
    starterFunctionName: "function threeSum(",
    order: 9,
};