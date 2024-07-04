import assert from "assert";
import { Problem } from "../types/problemStructure";

export const wordLadderHandler = (fn: any) => {
    try {
        const tests = [
            {beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"]},
            {beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log"]},
            {beginWord: "a", endWord: "c", wordList: ["a","b","c"]}
        ];
        const answers = [5, 0, 2];
        for (let i = 0; i < tests.length; i++) {
            const result = fn(tests[i].beginWord, tests[i].endWord, tests[i].wordList);
            assert.strictEqual(result, answers[i]);
        }
        return true;
    } catch (error: any) {
        console.log("Error from wordLadderHandler: ", error);
        throw new Error(error);
    }
};

const starterCodeWordLadderJS = `
function ladderLength(beginWord, endWord, wordList) {
    // Write your code here
}`;

export const wordLadder: Problem = {
    id: "word-ladder",
    title: "10. Word Ladder",
    problemStatement: `<p class='mt-3'>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -> s1 -> s2 -> ... -> sk</code> such that:</p>
    <ul>
        <li>Every adjacent pair of words differs by a single letter.</li>
        <li>Every <code>si</code> for 1 <= i <= k is in <code>wordList</code>. Note that <code>beginWord</code> does not need to be in <code>wordList</code>.</li>
        <li><code>sk == endWord</code></li>
    </ul>
    <p>Given two words, <code>beginWord</code> and <code>endWord</code>, and a dictionary <code>wordList</code>, return <em>the number of words in the <strong>shortest transformation sequence</strong> from <code>beginWord</code> to <code>endWord</code>, or</em> <code>0</code> <em>if no such sequence exists.</em></p>`,
    examples: [
        {
            id: 0,
            inputText: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
            outputText: "5",
            explanation: "One shortest transformation sequence is 'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog', which is 5 words long."
        },
        {
            id: 1,
            inputText: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
            outputText: "0",
            explanation: "The endWord 'cog' is not in wordList, therefore there is no valid transformation sequence."
        },
    ],
    constraints: `<li class='mt-2'>1 <= beginWord.length <= 10</li>
<li class='mt-2'>endWord.length == beginWord.length</li>
<li class='mt-2'>1 <= wordList.length <= 5000</li>
<li class='mt-2'>wordList[i].length == beginWord.length</li>
<li class='mt-2'>beginWord, endWord, and wordList[i] consist of lowercase English letters.</li>
<li class='mt-2'>beginWord != endWord</li>
<li class='mt-2'>All the words in wordList are unique.</li>`,
    starterCode: starterCodeWordLadderJS,
    handlerFunction: wordLadderHandler,
    difficulty: "Hard",
    starterFunctionName: "function ladderLength(",
    order: 10,
};