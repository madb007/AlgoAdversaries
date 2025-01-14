import assert from "assert";
import { Problem } from "../types/problemStructure";

export const longestPalindromicSubstringHandler = (fn: any) => {
    try {
        const tests = [
            "babad",
            "cbbd",
            "a",
            "ac",
            "racecar"
        ];
        const answers = [
            "bab", // or "aba"
            "bb",
            "a",
            "a",
            "racecar"
        ];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert(
                result === answers[i] || 
                (result.length === answers[i].length && tests[i].includes(result)),
                `Expected ${answers[i]} or a palindrome of the same length, but got ${result}`
            );
        }
        return true;
    } catch (error: any) {
        console.log("Error from longestPalindromicSubstringHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeLongestPalindromicSubstringJS = `
function longestPalindrome(s) {
    // Write your code here
}`;

export const longestPalindromicSubstring: Problem = {
    id: "longest-palindromic-substring",
    title: "7. Longest Palindromic Substring",
    problemStatement: `<p class='mt-3'>Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.</p>`,
    examples: [
        {
            id: 0,
            inputText: 's = "babad"',
            outputText: '"bab"',
            explanation: "The answer could also be 'aba'."
        },
        {
            id: 1,
            inputText: 's = "cbbd"',
            outputText: '"bb"',
        },
    ],
    constraints: `<li class='mt-2'>1 ≤ s.length ≤ 1000</li>
<li class='mt-2'><code>s</code> consist of only digits and English letters.</li>`,
    starterCode: starterCodeLongestPalindromicSubstringJS,
    handlerFunction: longestPalindromicSubstringHandler,
    difficulty: "Medium",
    starterFunctionName: "function longestPalindrome(",
    order: 7,
};