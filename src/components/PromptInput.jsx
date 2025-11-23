import React from "react";

const PromptInput = ({
  prompt,
  setPrompt,
  language,
  setLanguage,
  onGenerate,
  loading,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-2">Select Language</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">
        Describe what code you need
      </label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Write a function to reverse a string"
        className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        rows={6}
      />
    </div>

    <button
      onClick={onGenerate}
      disabled={loading || !prompt.trim()}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generating...
        </span>
      ) : (
        "Generate Code"
      )}
    </button>
  </div>
);

export default PromptInput;
