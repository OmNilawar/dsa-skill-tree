// Curated DSA Roadmap from User's Custom Questions
export const INITIAL_ROADMAP = [
  // ==========================================
  // LEVEL 1: FOUNDATIONS (Root)
  // ==========================================
  {
    id: "math",
    title: "Basic Math & Logic",
    level: 1,
    category: "Foundations",
    description: "Digit extraction, prime factorization, binary exponentiation, and overflow prevention.",
    prerequisites: [],
    position: { x: 620, y: 50 },
    conceptSummary: "Master modulo arithmetic, digit extraction, GCD, and binary representation before jumping into heavy data structures.",
    questions: [
      {
        id: "math-1",
        title: "Palindrome Number",
        useCase: "Digit Extraction & Modulo",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
        patternTip: "Reverse digits using % 10 and / 10, or compare digits from both ends."
      },
      {
        id: "math-2",
        title: "Reverse Integer",
        useCase: "Digit Reversal & Overflow",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
        patternTip: "Build the reversed number digit by digit and check overflow before multiplying by 10."
      },
      {
        id: "math-3",
        title: "Count Primes",
        useCase: "Sieve of Eratosthenes",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/count-primes/",
        patternTip: "Mark multiples starting from i*i for each prime i up to sqrt(n)."
      },
      {
        id: "math-4",
        title: "Pow(x, n)",
        useCase: "Binary Exponentiation",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/powx-n/",
        patternTip: "Square the base and halve the exponent at each step; handle negative exponents and INT_MIN carefully."
      }
    ]
  },

  // ==========================================
  // LEVEL 2: LINEAR CORE (Bifurcates from Math)
  // ==========================================
  {
    id: "arrays",
    title: "Arrays & Hashing",
    level: 2,
    category: "Linear Structures",
    description: "Hash maps for O(1) complement lookup, frequency counters, and prefix/suffix decompositions.",
    prerequisites: ["math"],
    position: { x: 380, y: 260 },
    conceptSummary: "Hash maps trade O(N) memory for O(1) lookups. Sets identify duplicates and unique boundary sequences.",
    questions: [
      {
        id: "arr-1",
        title: "Two Sum",
        useCase: "Complement Hash Map",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/two-sum/",
        patternTip: "Look for target - nums[i] in the map before storing the current number."
      },
      {
        id: "arr-2",
        title: "Contains Duplicate",
        useCase: "Hash Set",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
        patternTip: "A set reveals whether an element has already appeared."
      },
      {
        id: "arr-3",
        title: "Product of Array Except Self",
        useCase: "Prefix and Suffix Products",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
        patternTip: "Combine products to the left and right without using division."
      },
      {
        id: "arr-4",
        title: "Longest Consecutive Sequence",
        useCase: "Hash Set & Sequence Starts",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
        patternTip: "Start counting only when the previous consecutive value is absent."
      },
      {
        id: "arr-5",
        title: "Majority Element",
        useCase: "Boyer-Moore Voting",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/majority-element/",
        patternTip: "Cancel opposing votes to identify the element occurring more than n/2 times."
      }
    ]
  },
  {
    id: "sorting",
    title: "Sorting & Elementary Search",
    level: 2,
    category: "Foundations",
    description: "Divide and conquer sorting, 3-way Dutch flag partitioning, and boundary binary searches.",
    prerequisites: ["math"],
    position: { x: 860, y: 260 },
    conceptSummary: "Understand divide & conquer (Merge Sort), in-place partitioning (Quick Sort), and lower/upper bound binary searches.",
    questions: [
      {
        id: "sort-1",
        title: "Sort an Array",
        useCase: "Merge Sort / Heap Sort",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/sort-an-array/",
        patternTip: "Practice a guaranteed O(n log n) sorting algorithm and understand its space complexity."
      },
      {
        id: "sort-2",
        title: "Sort Colors",
        useCase: "Dutch National Flag",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
        patternTip: "Maintain low, mid, and high boundaries to sort three values in one pass."
      },
      {
        id: "sort-3",
        title: "Find the Difference of Two Arrays",
        useCase: "Sorting / Set Comparison",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/find-the-difference-of-two-arrays/",
        patternTip: "Compare unique elements using sets or sorted arrays."
      },
      {
        id: "sort-4",
        title: "Find First and Last Position of Element in Sorted Array",
        useCase: "Lower Bound / Upper Bound",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
        patternTip: "Use two binary searches to find the first and last occurrence."
      }
    ]
  },

  // ==========================================
  // LEVEL 3: POINTERS, WINDOWS & SEARCH
  // ==========================================
  {
    id: "two-pointers",
    title: "Two Pointers",
    level: 3,
    category: "Pointers & Windows",
    description: "Converging opposite-end pointers and greedy boundary movement on sorted spaces.",
    prerequisites: ["arrays"],
    position: { x: 60, y: 480 },
    conceptSummary: "Opposite-end pointers eliminate O(N^2) brute force on sorted arrays by leveraging monotonicity.",
    questions: [
      {
        id: "tp-1",
        title: "Valid Palindrome",
        useCase: "Opposite-End Pointers",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
        patternTip: "Move inward from both ends while skipping non-alphanumeric characters."
      },
      {
        id: "tp-2",
        title: "Two Sum II - Input Array Is Sorted",
        useCase: "Sorted Array Pointers",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        patternTip: "Move the left pointer up when the sum is too small and the right pointer down when too large."
      },
      {
        id: "tp-3",
        title: "3Sum",
        useCase: "Sorting + Two Pointers",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/3sum/",
        patternTip: "Sort first, fix one value, then use two pointers while carefully skipping duplicates."
      },
      {
        id: "tp-4",
        title: "Container With Most Water",
        useCase: "Greedy Pointer Movement",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
        patternTip: "Move the pointer at the shorter height because the shorter side limits the area."
      }
    ]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    level: 3,
    category: "Pointers & Windows",
    description: "Fixed and dynamic contiguous intervals, frequency matches, and monotonic deques.",
    prerequisites: ["arrays"],
    position: { x: 420, y: 480 },
    conceptSummary: "Add incoming element and subtract outgoing element in O(1) to avoid recomputing overlapping subsegments.",
    questions: [
      {
        id: "sw-1",
        title: "Maximum Average Subarray I",
        useCase: "Fixed-Size Window",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/maximum-average-subarray-i/",
        patternTip: "Add the incoming value and subtract the outgoing value to maintain the window sum."
      },
      {
        id: "sw-2",
        title: "Maximum Sum of Distinct Subarrays With Length K",
        useCase: "Fixed Window + Frequency Map",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/",
        patternTip: "Maintain the sum and element frequencies, accepting only windows of size k with k distinct values."
      },
      {
        id: "sw-3",
        title: "Longest Substring Without Repeating Characters",
        useCase: "Variable-Size Window",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        patternTip: "Expand the right boundary and move the left boundary past repeated characters."
      },
      {
        id: "sw-4",
        title: "Minimum Size Subarray Sum",
        useCase: "Smallest Valid Window",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
        patternTip: "For positive numbers, shrink the window while its sum remains at least the target."
      },
      {
        id: "sw-5",
        title: "Permutation in String",
        useCase: "Fixed Window + Frequency Matching",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
        patternTip: "Check whether a window of the required length has the same character frequencies."
      },
      {
        id: "sw-6",
        title: "Minimum Window Substring",
        useCase: "Variable Window + Required Frequencies",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
        patternTip: "Expand until all required characters are covered, then shrink to minimize the valid window."
      },
      {
        id: "sw-7",
        title: "Sliding Window Maximum",
        useCase: "Monotonic Deque",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
        patternTip: "Maintain candidate indices in decreasing order of their values."
      }
    ]
  },
  {
    id: "prefix-matrices",
    title: "Prefix Sum & Matrices",
    level: 3,
    category: "Linear Structures",
    description: "1D/2D cumulative sums, in-place matrix markings, and boundary traversals.",
    prerequisites: ["arrays"],
    position: { x: 780, y: 480 },
    conceptSummary: "Precompute cumulative totals to evaluate any range sum in O(1) time without repeated iteration.",
    questions: [
      {
        id: "pm-1",
        title: "Range Sum Query - Immutable",
        useCase: "One-Dimensional Prefix Sum",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/range-sum-query-immutable/",
        patternTip: "Answer each range query using prefix[right + 1] - prefix[left]."
      },
      {
        id: "pm-2",
        title: "Subarray Sum Equals K",
        useCase: "Prefix Sum + Hash Map",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
        patternTip: "For current prefix sum s, count previous prefix sums equal to s - k."
      },
      {
        id: "pm-3",
        title: "Range Sum Query 2D - Immutable",
        useCase: "Two-Dimensional Prefix Sum",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/range-sum-query-2d-immutable/",
        patternTip: "Use inclusion-exclusion over the four corners of a rectangle."
      },
      {
        id: "pm-4",
        title: "Set Matrix Zeroes",
        useCase: "In-Place Matrix Marking",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
        patternTip: "Use the first row and column as markers to achieve constant extra space."
      },
      {
        id: "pm-5",
        title: "Spiral Matrix",
        useCase: "Boundary-Based Traversal",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
        patternTip: "Maintain top, bottom, left, and right boundaries and shrink them after each traversal."
      }
    ]
  },
  {
    id: "strings",
    title: "String Algorithms",
    level: 3,
    category: "Linear Structures",
    description: "Character frequency counting, prefix comparisons, and center-expansion palindromes.",
    prerequisites: ["sorting"],
    position: { x: 1140, y: 480 },
    conceptSummary: "Use fixed 26/128-sized integer arrays instead of heavy hash maps for ASCII character frequency operations.",
    questions: [
      {
        id: "str-1",
        title: "Valid Anagram",
        useCase: "Character Frequency",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
        patternTip: "Compare character frequencies or sort both strings."
      },
      {
        id: "str-2",
        title: "Longest Common Prefix",
        useCase: "Prefix Comparison",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
        patternTip: "Compare characters across strings until the first mismatch."
      },
      {
        id: "str-3",
        title: "Find the Index of the First Occurrence in a String",
        useCase: "Pattern Matching",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        patternTip: "Understand brute-force matching before exploring KMP."
      },
      {
        id: "str-4",
        title: "Longest Palindromic Substring",
        useCase: "Expand Around Center",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
        patternTip: "Expand from every odd and even center to find the longest palindrome."
      }
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search on Answer",
    level: 3,
    category: "Search",
    description: "Search in rotated arrays, pivot boundary detection, and monotonic answer space feasibility.",
    prerequisites: ["sorting"],
    position: { x: 1500, y: 480 },
    conceptSummary: "If a problem asks for minimum maximum or maximum minimum, check if the feasibility condition is monotonic.",
    questions: [
      {
        id: "bs-1",
        title: "Binary Search",
        useCase: "Search in Sorted Array",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/binary-search/",
        patternTip: "Maintain a valid search interval and calculate the midpoint safely."
      },
      {
        id: "bs-2",
        title: "Search in Rotated Sorted Array",
        useCase: "Modified Binary Search",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        patternTip: "Determine which half is sorted and check whether the target lies inside it."
      },
      {
        id: "bs-3",
        title: "Find Minimum in Rotated Sorted Array",
        useCase: "Rotation Pivot Search",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
        patternTip: "Compare the middle value with the rightmost value to identify the half containing the minimum."
      },
      {
        id: "bs-4",
        title: "Koko Eating Bananas",
        useCase: "Binary Search on Answer",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
        patternTip: "Binary-search the eating speed using a monotonic feasibility check."
      },
      {
        id: "bs-5",
        title: "Capacity To Ship Packages Within D Days",
        useCase: "Minimum Feasible Capacity",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
        patternTip: "Search the minimum capacity that allows shipping within the required number of days."
      }
    ]
  },

  // ==========================================
  // LEVEL 4: LINKED LISTS, RECURSION & HEAPS
  // ==========================================
  {
    id: "linked-lists",
    title: "Linked Lists",
    level: 4,
    category: "Pointer Structures",
    description: "Pointer reversal, sentinel dummy heads, cycle detection, and list interleaving.",
    prerequisites: ["arrays", "two-pointers"],
    position: { x: 100, y: 700 },
    conceptSummary: "Always consider a dummy head node to eliminate special cases when inserting or deleting the head.",
    questions: [
      {
        id: "ll-1",
        title: "Reverse Linked List",
        useCase: "Iterative Pointer Reversal",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
        patternTip: "Save the next node before redirecting the current node's next pointer."
      },
      {
        id: "ll-2",
        title: "Merge Two Sorted Lists",
        useCase: "Dummy Node & Merging",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
        patternTip: "Use a dummy head and repeatedly attach the smaller current node."
      },
      {
        id: "ll-3",
        title: "Linked List Cycle",
        useCase: "Floyd's Slow and Fast Pointers",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
        patternTip: "Move pointers at different speeds; a meeting indicates a cycle."
      },
      {
        id: "ll-4",
        title: "Remove Nth Node From End of List",
        useCase: "Two Pointers with a Gap",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        patternTip: "Maintain an n-node gap between pointers and use a dummy node for head removal."
      },
      {
        id: "ll-5",
        title: "Reorder List",
        useCase: "Middle + Reverse + Merge",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
        patternTip: "Find the middle, reverse the second half, and interleave both halves."
      }
    ]
  },
  {
    id: "recursion-backtracking",
    title: "Recursion & Backtracking",
    level: 4,
    category: "Search & Recursion",
    description: "Combinatorial decision trees, permutations, pruning, and grid backtracking.",
    prerequisites: ["arrays", "strings"],
    position: { x: 800, y: 700 },
    conceptSummary: "Backtracking explores all potential paths: base case check, choose, explore recursively, undo choice.",
    questions: [
      {
        id: "rb-1",
        title: "Subsets",
        useCase: "Include / Exclude Recursion",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/subsets/",
        patternTip: "At each index, explore taking the element and skipping it."
      },
      {
        id: "rb-2",
        title: "Permutations",
        useCase: "Choice-Based Backtracking",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/permutations/",
        patternTip: "Choose an unused element, recurse, and undo the choice."
      },
      {
        id: "rb-3",
        title: "Combination Sum",
        useCase: "Backtracking with Reuse",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
        patternTip: "Remain at the current index when reuse is allowed and stop when the remaining target is negative."
      },
      {
        id: "rb-4",
        title: "Word Search",
        useCase: "Grid Backtracking",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/word-search/",
        patternTip: "Mark cells on the current path and restore them when backtracking."
      },
      {
        id: "rb-5",
        title: "N-Queens",
        useCase: "Constraint-Based Backtracking",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/n-queens/",
        patternTip: "Track occupied columns and diagonals to reject invalid placements quickly."
      }
    ]
  },
  {
    id: "heaps",
    title: "Heaps & Priority Queues",
    level: 4,
    category: "Non-Linear Structures",
    description: "Min/Max heaps for Top-K tracking, running medians, and K-way matrix merging.",
    prerequisites: ["sorting", "arrays"],
    position: { x: 1340, y: 700 },
    conceptSummary: "To find Top-K largest elements, maintain a Min-Heap of size K: the smallest of the top-K is always at the top.",
    questions: [
      {
        id: "heap-1",
        title: "Kth Largest Element in an Array",
        useCase: "Min Heap of Size K",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        patternTip: "Keep only the k largest elements in a min heap, or use Quickselect."
      },
      {
        id: "heap-2",
        title: "Top K Frequent Elements",
        useCase: "Frequency Map + Heap",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
        patternTip: "Count frequencies and select the k largest counts with a heap or bucket sort."
      },
      {
        id: "heap-3",
        title: "Find Median from Data Stream",
        useCase: "Two Heaps",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream/",
        patternTip: "Use a max heap for the lower half and a min heap for the upper half."
      },
      {
        id: "heap-4",
        title: "Kth Smallest Element in a Sorted Matrix",
        useCase: "Heap-Based K-Way Merge",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
        patternTip: "Use a min heap to repeatedly extract the smallest current matrix element."
      }
    ]
  },

  // ==========================================
  // LEVEL 5: STACKS, QUEUES & TREES
  // ==========================================
  {
    id: "stack-queue",
    title: "Stack & Queue",
    level: 4,
    category: "Linear Structures",
    description: "Parentheses validation, monotonic stacks for nearest smaller/greater, and histogram boundaries.",
    prerequisites: ["arrays", "linked-lists"],
    position: { x: 260, y: 920 },
    conceptSummary: "Monotonic stacks resolve 'next greater/smaller' in O(N) by maintaining strictly ordered elements.",
    questions: [
      {
        id: "sq-1",
        title: "Valid Parentheses",
        useCase: "Stack Matching",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
        patternTip: "Push opening brackets and validate each closing bracket against the stack top."
      },
      {
        id: "sq-2",
        title: "Min Stack",
        useCase: "Stack with Auxiliary Minimum",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/min-stack/",
        patternTip: "Track minimum values alongside stack entries to support constant-time minimum queries."
      },
      {
        id: "sq-3",
        title: "Daily Temperatures",
        useCase: "Monotonic Decreasing Stack",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
        patternTip: "Resolve earlier colder days when a warmer temperature arrives."
      },
      {
        id: "sq-4",
        title: "Largest Rectangle in Histogram",
        useCase: "Monotonic Stack Boundaries",
        difficulty: "Hard",
        leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        patternTip: "Find the nearest smaller bar on both sides to determine each bar's maximum rectangle."
      },
      {
        id: "sq-5",
        title: "Implement Queue using Stacks",
        useCase: "Two-Stack Queue",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
        patternTip: "Use one stack for incoming elements and another for outgoing elements."
      }
    ]
  },
  {
    id: "trees-bst",
    title: "Trees & BST",
    level: 5,
    category: "Non-Linear Structures",
    description: "DFS depth combining, BFS queue levels, BST range invariants, and Lowest Common Ancestor.",
    prerequisites: ["recursion-backtracking", "stack-queue"],
    position: { x: 680, y: 920 },
    conceptSummary: "Solve recursively for left and right subtrees. BFS uses queue snapshot size to process one level at a time.",
    questions: [
      {
        id: "tree-1",
        title: "Maximum Depth of Binary Tree",
        useCase: "Recursive Tree Traversal",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
        patternTip: "The depth is one plus the maximum depth of the left and right subtrees."
      },
      {
        id: "tree-2",
        title: "Binary Tree Level Order Traversal",
        useCase: "BFS by Levels",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
        patternTip: "Process exactly the queue size at the beginning of each level."
      },
      {
        id: "tree-3",
        title: "Diameter of Binary Tree",
        useCase: "Postorder Height Calculation",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
        patternTip: "At each node, combine left and right subtree heights while maintaining a global maximum."
      },
      {
        id: "tree-4",
        title: "Validate Binary Search Tree",
        useCase: "BST Range Validation",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
        patternTip: "Pass lower and upper bounds instead of checking only immediate children."
      },
      {
        id: "tree-5",
        title: "Lowest Common Ancestor of a Binary Tree",
        useCase: "Recursive Ancestor Search",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        patternTip: "If the left and right recursive calls both find a target, the current node is the LCA."
      }
    ]
  },

  // ==========================================
  // LEVEL 6: GRAPHS & DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: "graphs",
    title: "Graphs & Traversals",
    level: 6,
    category: "Non-Linear Structures",
    description: "Grid connected components, cloning with maps, cycle detection, DSU, Dijkstra, and multi-source BFS.",
    prerequisites: ["trees-bst", "heaps"],
    position: { x: 480, y: 1140 },
    conceptSummary: "Grid problems are implicit graphs with 4 neighbors. Use visited sets or states to prevent infinite loops.",
    questions: [
      {
        id: "graph-1",
        title: "Number of Islands",
        useCase: "Grid DFS / BFS",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
        patternTip: "Each unvisited land cell starts a new component; mark the whole component with DFS or BFS."
      },
      {
        id: "graph-2",
        title: "Clone Graph",
        useCase: "DFS + Node Mapping",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
        patternTip: "Map original nodes to cloned nodes before traversing their neighbors to handle cycles."
      },
      {
        id: "graph-3",
        title: "Course Schedule",
        useCase: "Cycle Detection / Topological Sort",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
        patternTip: "Use DFS states or Kahn's algorithm to determine whether a directed cycle exists."
      },
      {
        id: "graph-4",
        title: "Redundant Connection",
        useCase: "Disjoint Set Union",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
        patternTip: "An edge joining vertices already in the same DSU component creates a cycle."
      },
      {
        id: "graph-5",
        title: "Network Delay Time",
        useCase: "Dijkstra's Algorithm",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
        patternTip: "Use a min priority queue to repeatedly process the closest known vertex."
      },
      {
        id: "graph-6",
        title: "Rotting Oranges",
        useCase: "Multi-Source BFS",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
        patternTip: "Initialize the queue with every rotten orange and process the grid level by level."
      }
    ]
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    level: 6,
    category: "Optimization & DP",
    description: "1D transitions, take/skip decisions, unbounded knapsack, subsequence transitions, and grid paths.",
    prerequisites: ["recursion-backtracking", "prefix-matrices", "trees-bst"],
    position: { x: 920, y: 1140 },
    conceptSummary: "Identify optimal substructure: state definition, base cases, and transition relations.",
    questions: [
      {
        id: "dp-1",
        title: "Climbing Stairs",
        useCase: "One-Dimensional DP",
        difficulty: "Easy",
        leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
        patternTip: "Define ways[i] using the previous two states and optimize to constant space."
      },
      {
        id: "dp-2",
        title: "House Robber",
        useCase: "Take or Skip",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/house-robber/",
        patternTip: "Choose between taking the current value plus dp[i-2] or skipping it with dp[i-1]."
      },
      {
        id: "dp-3",
        title: "Coin Change",
        useCase: "Unbounded Knapsack",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/coin-change/",
        patternTip: "Build the minimum number of coins for each amount using previously computed states."
      },
      {
        id: "dp-4",
        title: "Longest Increasing Subsequence",
        useCase: "Subsequence DP / Binary Search",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
        patternTip: "Understand the O(n^2) state transition before revising the O(n log n) tails approach."
      },
      {
        id: "dp-5",
        title: "Longest Common Subsequence",
        useCase: "Two-String DP",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
        patternTip: "When characters match, extend the diagonal state; otherwise take the better neighboring state."
      },
      {
        id: "dp-6",
        title: "Unique Paths",
        useCase: "Grid DP",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
        patternTip: "Compute each cell from the number of paths arriving from above and from the left."
      },
      {
        id: "dp-7",
        title: "Edit Distance",
        useCase: "String Transformation DP",
        difficulty: "Medium",
        leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
        patternTip: "Model insertion, deletion, and replacement using a two-dimensional state."
      }
    ]
  }
];

export const deriveEdgesFromRoadmap = (nodes) => {
  const edges = [];
  nodes.forEach((node) => {
    node.prerequisites.forEach((prereqId) => {
      edges.push({
        id: `edge-${prereqId}->${node.id}`,
        source: prereqId,
        target: node.id,
        type: 'smoothstep',
        animated: true,
      });
    });
  });
  return edges;
};
