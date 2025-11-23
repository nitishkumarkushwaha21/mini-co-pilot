// Code templates for different languages
export const codeTemplates = {
  python: {
    reverse:
      'def reverse_string(s):\n    """Reverse a string"""\n    return s[::-1]\n\n# Example usage\nprint(reverse_string("hello"))',
    sort: 'def bubble_sort(arr):\n    """Sort array using bubble sort"""\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr',
    fibonacci:
      'def fibonacci(n):\n    """Generate fibonacci sequence"""\n    if n <= 0:\n        return []\n    elif n == 1:\n        return [0]\n    elif n == 2:\n        return [0, 1]\n    \n    fib = [0, 1]\n    for i in range(2, n):\n        fib.append(fib[i-1] + fib[i-2])\n    return fib',
    default:
      'def process_data(data):\n    """Process the input data"""\n    result = []\n    for item in data:\n        # Process each item\n        processed = item.strip().lower()\n        result.append(processed)\n    return result',
  },
  javascript: {
    reverse:
      'function reverseString(str) {\n  // Reverse a string\n  return str.split("").reverse().join("");\n}\n\n// Example usage\nconsole.log(reverseString("hello"));',
    sort: "function bubbleSort(arr) {\n  // Sort array using bubble sort\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}",
    fibonacci:
      "function fibonacci(n) {\n  // Generate fibonacci sequence\n  if (n <= 0) return [];\n  if (n === 1) return [0];\n  if (n === 2) return [0, 1];\n  \n  const fib = [0, 1];\n  for (let i = 2; i < n; i++) {\n    fib.push(fib[i - 1] + fib[i - 2]);\n  }\n  return fib;\n}",
    default:
      "function processData(data) {\n  // Process the input data\n  return data.map(item => {\n    // Process each item\n    return item.trim().toLowerCase();\n  });\n}",
  },
  cpp: {
    reverse:
      '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring reverseString(string str) {\n    // Reverse a string\n    reverse(str.begin(), str.end());\n    return str;\n}\n\nint main() {\n    cout << reverseString("hello") << endl;\n    return 0;\n}',
    sort: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvoid bubbleSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                swap(arr[j], arr[j + 1]);\n            }\n        }\n    }\n}",
    fibonacci:
      "#include <iostream>\n#include <vector>\nusing namespace std;\n\nvector<int> fibonacci(int n) {\n    vector<int> fib;\n    if (n <= 0) return fib;\n    if (n >= 1) fib.push_back(0);\n    if (n >= 2) fib.push_back(1);\n    \n    for (int i = 2; i < n; i++) {\n        fib.push_back(fib[i-1] + fib[i-2]);\n    }\n    return fib;\n}",
    default:
      "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nvector<string> processData(vector<string> data) {\n    vector<string> result;\n    for (const auto& item : data) {\n        // Process each item\n        result.push_back(item);\n    }\n    return result;\n}",
  },
};

// Mock API Service
export const mockAPI = {
  async generate(prompt, language) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const langTemplates = codeTemplates[language] || codeTemplates.javascript;
    const lowerPrompt = prompt.toLowerCase();

    let code = langTemplates.default;
    for (const [key, template] of Object.entries(langTemplates)) {
      if (lowerPrompt.includes(key)) {
        code = template;
        break;
      }
    }

    return { code };
  },
};
