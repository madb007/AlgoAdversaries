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
        solution:
            'class Solution {\
            twoSum(nums, target) {\
                let numMap = new Map();\
                for (let i = 0; i < nums.length; i++) {\
                    let complement = target - nums[i];\
                    if (numMap.has(complement)) {\
                        return [numMap.get(complement), i];\
                    }\
                    numMap.set(nums[i], i);\
                }\
                return [];\
            }\
        }',
    },
    {
        id: "reverse-linked-list",
        title: "Reverse Linked List",
        difficulty: "Hard",
        category: "Linked List",
        order: 2,
        solution: ' class Solution {\
            reverseList(head) {\
                let node = null;\
                while (head !== null) {\
                    let temp = head.next;\
                    head.next = node;\
                    node = head;\
                    head = temp;\
                }\
                return node;\
            }\
        }',
    },
    {
        id: "subarray-xor",
        title: "Subarray XOR",
        difficulty: "Medium",
        category: "Array",
        order: 3,
        solution: "function countXORSubarrays(A, K) {\
            let count = 0;\
            let xor = 0;\
            let map = new Map();\
            map.set(0, 1);\
            \
            for (let num of A) {\
                xor ^= num;\
                if (map.has(xor ^ K)) {\
                    count += map.get(xor ^ K);\
                }\
                map.set(xor, (map.get(xor) || 0) + 1);\
            }\
            \
            return count;\
        }",
    },
    {
        id: "roman-numeral-encoder",
        title: "Roman Numeral Encoder",
        difficulty: "Medium",
        category: "String",
        order: 4,
        solution: "function solution(number) {\
            const romanNumerals = [\
                { value: 1000, symbol: 'M' },\
                { value: 900, symbol: 'CM' },\
                { value: 500, symbol: 'D' },\
                { value: 400, symbol: 'CD' },\
                { value: 100, symbol: 'C' },\
                { value: 90, symbol: 'XC' },\
                { value: 50, symbol: 'L' },\
                { value: 40, symbol: 'XL' },\
                { value: 10, symbol: 'X' },\
                { value: 9, symbol: 'IX' },\
                { value: 5, symbol: 'V' },\
                { value: 4, symbol: 'IV' },\
                { value: 1, symbol: 'I' }\
            ];\
            \
            let result = '';\
            for (let i = 0; i < romanNumerals.length; i++) {\
                while (number >= romanNumerals[i].value) {\
                    result += romanNumerals[i].symbol;\
                    number -= romanNumerals[i].value;\
                }\
            }\
            return result;\
        }",
    },
    {
        id: "chef-and-subsequences",
        title: "9. Chef and Subsequences",
        difficulty: "Hard",
        category: "Dynamic Programming",
        order: 9,
        solution: "//May not be a robust solution\
        function countDivisibleSubsequences(N, K, A) {\
            const MOD = 1e9 + 7;\
            let dp = new Array(K).fill(0);\
            dp[0] = 1;\
            \
            for (let num of A) {\
                let newDp = [...dp];\
                for (let i = 0; i < K; i++) {\
                    let newSum = (i + num) % K;\
                    newDp[newSum] = (newDp[newSum] + dp[i]) % MOD;\
                }\
                dp = newDp;\
            }\
            \
            return (dp[0] - 1 + MOD) % MOD;\
        }",
    },
    {
        id: "shortest-knight-path",
        title: "8. Shortest Knight Path",
        difficulty: "Hard",
        category: "Graph",
        order: 8,
        solution: " // May not be a robust solution\
        function knight(start, end) {\
            const moves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];\
            const queue = [[start[0].charCodeAt(0) - 97, parseInt(start[1]) - 1, 0]];\
            const visited = new Set();\
            \
            while (queue.length > 0) {\
                const [x, y, dist] = queue.shift();\
                if (x === end[0].charCodeAt(0) - 97 && y === parseInt(end[1]) - 1) return dist;\
                \
                for (const [dx, dy] of moves) {\
                    const newX = x + dx;\
                    const newY = y + dy;\
                    const newPos = newX + ',' + newY;\
                    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !visited.has(newPos)) {\
                        queue.push([newX, newY, dist + 1]);\
                        visited.add(newPos);\
                    }\
                }\
            }\
            \
            return -1;\
        }",
    },
    {
        id: "longest-palindromic-substring",
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        category: "String",
        order: 7,
        solution: "function longestPalindrome(s) {\
            let start = 0, maxLength = 1;\
            function expandAroundCenter(left, right) {\
                while (left >= 0 && right < s.length && s[left] === s[right]) {\
                    if (right - left + 1 > maxLength) {\
                        start = left;\
                        maxLength = right - left + 1;\
                    }\
                    left--;\
                    right++;\
                }\
            }\
            for (let i = 0; i < s.length; i++) {\
                expandAroundCenter(i - 1, i + 1);\
                expandAroundCenter(i, i + 1);\
            }\
            return s.substring(start, start + maxLength);\
        }",
    },
    {
        id: "container-with-most-water",
        title: "Container With Most Water",
        difficulty: "Medium",
        category: "Array",
        order: 5,
        solution: "function maxArea(height) {\
            let maxWater = 0, left = 0, right = height.length - 1;\
            while (left < right) {\
                let water = Math.min(height[left], height[right]) * (right - left);\
                maxWater = Math.max(maxWater, water);\
                if (height[left] < height[right]) {\
                    left++;\
                } else {\
                    right--;\
                }\
            }\
            return maxWater;\
        }",
    },
    {
        id: "3sum",
        title: "3Sum",
        difficulty: "Medium",
        category: "Array",
        order: 6,
        solution: "function threeSum(nums) {\
            nums.sort((a, b) => a - b);\
            const result = [];\
            for (let i = 0; i < nums.length - 2; i++) {\
                if (i > 0 && nums[i] === nums[i - 1]) continue;\
                let left = i + 1, right = nums.length - 1;\
                while (left < right) {\
                    const sum = nums[i] + nums[left] + nums[right];\
                    if (sum === 0) {\
                        result.push([nums[i], nums[left], nums[right]]);\
                        while (left < right && nums[left] === nums[left + 1]) left++;\
                        while (left < right && nums[right] === nums[right - 1]) right--;\
                        left++;\
                        right--;\
                    } else if (sum < 0) {\
                        left++;\
                    } else {\
                        right--;\
                    }\
                }\
            }\
            return result;\
        }",
    },
    {
        id: "word-ladder",
        title: "Word Ladder",
        difficulty: "Hard",
        category: "Graph",
        order: 10,
        solution: "function ladderLength(beginWord, endWord, wordList) {\
            const wordSet = new Set(wordList);\
            if (!wordSet.has(endWord)) return 0;\
            \
            const queue = [[beginWord, 1]];\
            const visited = new Set([beginWord]);\
            \
            while (queue.length) {\
                const [word, level] = queue.shift();\
                if (word === endWord) return level;\
                \
                for (let i = 0; i < word.length; i++) {\
                    for (let j = 97; j <= 122; j++) {\
                        const newWord = word.slice(0, i) + String.fromCharCode(j) + word.slice(i + 1);\
                        if (wordSet.has(newWord) && !visited.has(newWord)) {\
                            queue.push([newWord, level + 1]);\
                            visited.add(newWord);\
                        }\
                    }\
                }\
            }\
            \
            return 0;\
        }",
    },
];
   