import assert from "assert";
import { Problem } from "../types/problemStructure";

export const containerWithMostWaterHandler = (fn: any) => {
    try {
        const tests = [
            [1,8,6,2,5,4,8,3,7],
            [1,1],
            [4,3,2,1,4],
            [1,2,1]
        ];
        const answers = [49, 1, 16, 2];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i]);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from containerWithMostWaterHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeContainerWithMostWaterJS = `
function maxArea(height) {
    // Write your code here
}`;

export const containerWithMostWater: Problem = {
    id: "container-with-most-water",
    title: "5. Container With Most Water",
    problemStatement: `<p class='mt-3'>Given <code>n</code> non-negative integers <code>a1, a2, ..., an</code> , where each represents a point at coordinate <code>(i, ai)</code>. <code>n</code> vertical lines are drawn such that the two endpoints of the line <code>i</code> is at <code>(i, ai)</code> and <code>(i, 0)</code>. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.</p>
    <p><strong>Note:</strong> You may not slant the container.</p>`,
    examples: [
        {
            id: 0,
            inputText: "height = [1,8,6,2,5,4,8,3,7]",
            outputText: "49",
            explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
        },
        {
            id: 1,
            inputText: "height = [1,1]",
            outputText: "1",
        },
    ],
    constraints: `<li class='mt-2'><code>n == height.length</code></li>
<li class='mt-2'>2 ≤ n ≤ 10^5</li>
<li class='mt-2'>0 ≤ height[i] ≤ 10^4</li>`,
    starterCode: starterCodeContainerWithMostWaterJS,
    handlerFunction: containerWithMostWaterHandler,
    difficulty: "Medium",
    starterFunctionName: "function maxArea(",
    order: 5,
};