import assert from "assert";
import { Problem } from "../types/problemStructure";

export const shortestKnightPathHandler = (fn: any) => {
    try {
        const tests = [
            { start: "a1", end: "c1" },
            { start: "a1", end: "f1" },
            { start: "a1", end: "f3" },
            { start: "a1", end: "f4" },
            { start: "a1", end: "f7" }
        ];
        const answers = [2, 3, 3, 4, 5];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i].start, tests[i].end);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from shortestKnightPathHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeShortestKnightPathJS = `
function knight(start, end) {
    // Write your code here
}`;

export const shortestKnightPath: Problem = {
    id: "shortest-knight-path",
    title: "6. Shortest Knight Path",
    problemStatement: `<p class='mt-3'>Given two different positions on a chess board, find the least number of moves it would take a knight to get from one to the other. The positions will be passed as two arguments in algebraic notation.</p>
    <p>For example, knight("a3", "b5") should return 1.</p>
    <p>The knight is moved according to the rules of chess, along two squares and then one square perpendicular to the last two.</p>`,
    examples: [
        {
            id: 0,
            inputText: 'start = "a1", end = "c1"',
            outputText: "2",
        },
        {
            id: 1,
            inputText: 'start = "a1", end = "f1"',
            outputText: "3",
        },
        {
            id: 2,
            inputText: 'start = "a1", end = "f3"',
            outputText: "3",
        },
        {
            id: 3,
            inputText: 'start = "a1", end = "f4"',
            outputText: "4",
        },
        {
            id: 4,
            inputText: 'start = "a1", end = "f7"',
            outputText: "5",
        },
    ],
    constraints: `<li class='mt-2'>The board is 8x8.</li>
<li class='mt-2'>The algebraic notation consists of one letter and one number.</li>
<li class='mt-2'>The horizontal letters are from 'a' to 'h'.</li>
<li class='mt-2'>The vertical numbers are from 1 to 8.</li>`,
    starterCode: starterCodeShortestKnightPathJS,
    handlerFunction: shortestKnightPathHandler,
    difficulty: "Hard",
    starterFunctionName: "function knight(",
    order: 6,
};