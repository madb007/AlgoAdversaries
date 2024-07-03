import assert from "assert";
import { Problem } from "../types/problemStructure";

export const subarrayXORHandler = (fn: any) => {
    try {
        const tests = [
            { A: [4, 2, 2, 6, 4], K: 6 },
            { A: [5, 6, 7, 8, 9], K: 5 },
            { A: [3, 3, 3], K: 0 },
            { A: [1, 2, 3, 4, 5], K: 4 }
        ];
        const answers = [4, 2, 1, 3];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i].A, tests[i].K);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from subarrayXORHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeSubarrayXORJS = `
function countXORSubarrays(A, K) {
    // Write your code here
}`;

export const subarrayXOR: Problem = {
    id: "subarray-xor",
    title: "3. Subarray XOR",
    problemStatement: `<p class='mt-3'>Given an array A of N integers, find the number of subarrays whose XOR is equal to a given integer K.</p>`,
    examples: [
        {
            id: 0,
            inputText: "A = [4, 2, 2, 6, 4], K = 6",
            outputText: "4",
        },
        {
            id: 1,
            inputText: "A = [5, 6, 7, 8, 9], K = 5",
            outputText: "2",
        },
    ],
    constraints: `<li class='mt-2'>1 ≤ N ≤ 10^5</li>
<li class='mt-2'>1 ≤ A[i] ≤ 10^5</li>
<li class='mt-2'>1 ≤ K ≤ 10^5</li>`,
    starterCode: starterCodeSubarrayXORJS,
    handlerFunction: subarrayXORHandler,
    difficulty: "Medium",
    starterFunctionName: "function countXORSubarrays(",
    order: 3,
};