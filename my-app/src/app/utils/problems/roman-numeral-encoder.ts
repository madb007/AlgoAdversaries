import assert from "assert";
import { Problem } from "../types/problemStructure";

export const romanNumeralEncoderHandler = (fn: any) => {
    try {
        const tests = [1000, 1990, 2008, 1666, 3999];
        const answers = ["M", "MCMXC", "MMVIII", "MDCLXVI", "MMMCMXCIX"];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from romanNumeralEncoderHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeRomanNumeralEncoderJS = `
function solution(number) {
    // Write your code here
}`;

export const romanNumeralEncoder: Problem = {
    id: "roman-numeral-encoder",
    title: "4. Roman Numeral Encoder",
    problemStatement: `<p class='mt-3'>Create a function that takes a positive integer as its parameter and returns a string containing the Roman Numeral representation of that integer.</p>
    <p>Modern Roman numerals are written by expressing each digit separately starting with the left most digit and skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.</p>`,
    examples: [
        {
            id: 0,
            inputText: "1000",
            outputText: '"M"',
        },
        {
            id: 1,
            inputText: "1990",
            outputText: '"MCMXC"',
        },
        {
            id: 2,
            inputText: "2008",
            outputText: '"MMVIII"',
        },
    ],
    constraints: `<li class='mt-2'>1 ≤ number ≤ 3999</li>`,
    starterCode: starterCodeRomanNumeralEncoderJS,
    handlerFunction: romanNumeralEncoderHandler,
    difficulty: "Medium",
    starterFunctionName: "function solution(",
    order: 4,
};