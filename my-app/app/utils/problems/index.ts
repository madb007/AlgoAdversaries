import { Problem } from '../types/problemStructure';
import{twoSum} from './two-sum';
import { reverseLinkedList } from './reverse-linked-list';
import { subarrayXOR } from './subarray-xor';
import { romanNumeralEncoder } from './roman-numeral-encoder';
import { shortestKnightPath } from './shortest-knight-path';
import { chefAndSubsequences } from './chef-and-subsequences';
import { threeSum } from './three-sum';
import { containerWithMostWater } from './container-with-most-water';
import { longestPalindromicSubstring } from './longest-palindromic-substring';
import { wordLadder } from './word-ladder';

interface problemMap {
    [key:string]: Problem;
}

export const problems: problemMap = {
    "two-sum" : twoSum,
    "reverse-linked-list":reverseLinkedList,
    "subarray-xor": subarrayXOR,
    "roman-numeral-encoder": romanNumeralEncoder,
    "shortest-knight-path": shortestKnightPath,
    "chef-and-subsequences": chefAndSubsequences,
    "three-sum": threeSum,
    "container-with-most-water": containerWithMostWater,
    "longest-palindromic-substring": longestPalindromicSubstring,
    "word-ladder": wordLadder,
};