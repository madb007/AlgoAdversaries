import { Problem } from '../types/problemStructure';
import{twoSum} from './two-sum';
import { reverseLinkedList } from './reverse-linked-list';

interface problemMap {
    [key:string]: Problem;
}

export const problems: problemMap = {
    "two-sum" : twoSum,
    "reverse-linked-list":reverseLinkedList,
};