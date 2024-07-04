import assert from "assert";
import { Problem } from "../types/problemStructure";

export const chefAndSubsequencesHandler = (fn: any) => {
    try {
        const tests = [
            { N: 3, K: 2, A: [1, 2, 3] },
            { N: 4, K: 3, A: [1, 2, 3, 4] },
            { N: 5, K: 4, A: [2, 4, 6, 8, 10] },
            { N: 3, K: 5, A: [1, 2, 3] }
        ];
        const answers = [4, 8, 16, 0];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i].N, tests[i].K, tests[i].A);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from chefAndSubsequencesHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeChefAndSubsequencesJS = `
function countDivisibleSubsequences(N, K, A) {
    // Write your code here
}`;

export const chefAndSubsequences: Problem = {
    id: "chef-and-subsequences",
    title: "5. Chef and Subsequences",
    problemStatement: `<p class='mt-3'>Chef has an array A of N integers. He wants to find the number of subsequences of A that have a sum divisible by K.</p>
    <p>A subsequence of an array is obtained by deleting some (possibly zero or all) elements from the array without changing the order of the remaining elements.</p>`,
    examples: [
        {
            id: 0,
            inputText: "N = 3, K = 2, A = [1, 2, 3]",
            outputText: "4",
        },
        {
            id: 1,
            inputText: "N = 4, K = 3, A = [1, 2, 3, 4]",
            outputText: "8",
        },
    ],
    constraints: `<li class='mt-2'>1 ≤ N ≤ 10^5</li>
<li class='mt-2'>1 ≤ K ≤ 100</li>
<li class='mt-2'>1 ≤ A[i] ≤ 10^9</li>`,
    starterCode: starterCodeChefAndSubsequencesJS,
    handlerFunction: chefAndSubsequencesHandler,
    difficulty: "Hard",
    starterFunctionName: "function countDivisibleSubsequences(",
    order: 5,
};