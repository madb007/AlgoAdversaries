export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	solution?: string;
};

export const problems: Problem[] = [
	{
		id: "two-sum",
		title: "Two Sum",
		difficulty: "Easy",
		category: "Array",
		order: 1,
		solution: 'class Solution {\
            public:\
              vector<int> twoSum(vector<int>& nums, int target) {\
                unordered_map<int, int> numMap;\
                for (int i = 0; i < nums.size(); i++) {\
                    int complement = target - nums[i];\
                    if (numMap.count(complement)) {\
                        return {numMap[complement], i};\
                    }\
                    numMap[nums[i]] = i;\
                }\
                return {};\
              }\
            };',
	},
	{
		id: "reverse-linked-list",
		title: "Reverse Linked List",
		difficulty: "Hard",
		category: "Linked List",
		order: 2,
		solution: 'class Solution {\
            public:\
                ListNode* reverseList(ListNode* head) {\
                    ListNode* node = nullptr;\
                    while (head != nullptr) {\
                        ListNode* temp = head->next;\
                        head->next = node;\
                        node = head;\
                        head = temp;\
                    }\
                    return node;\
                }\
            };',
	},
	{
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medium",
		category: "Dynamic Programming",
		order: 3,
		solution: "",
	},
	{
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Easy",
		category: "Stack",
		order: 4,
		solution: "",
	},
	{
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Medium",
		category: "Binary Search",
		order: 5,
		solution: "",
	},
	{
		id: "container-with-most-water",
		title: "Container With Most Water",
		difficulty: "Medium",
		category: "Two Pointers",
		order: 6,
		solution: "",
	},
	{
		id: "merge-intervals",
		title: "Merge Intervals",
		difficulty: "Medium",
		category: "intervals",
		order: 7,
		solution: "",
	},
	{
		id: "maximum-depth-of-binary-tree",
		title: "Maximum Depth of Binary Tree",
		difficulty: "Easy",
		category: "Tree",
		order: 8,
		solution: "",
	},
	{
		id: "best-time-to-buy-and-sell-stock",
		title: "Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		category: "Array",
		order: 9,
		solution: "",
	},
	{
		id: "subsets",
		title: "Subsets",
		difficulty: "Medium",
		category: "Backtracking",
		order: 10,
		solution: "",
	},
];