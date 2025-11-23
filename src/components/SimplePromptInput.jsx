import React, { useState } from "react";
import { Send, Mic, ChevronDown, Code } from "lucide-react";

const ModernPromptInput = ({
  prompt,
  setPrompt,
  language,
  setLanguage,
  onGenerate,
  loading,
  darkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { value: "python", label: "Python", icon: "🐍" },
    { value: "javascript", label: "JavaScript", icon: "⚡" },
    { value: "cpp", label: "C++", icon: "⚙️" },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onGenerate();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with greeting */}
      <div className="text-center mb-6">
        <h2
          className={`text-2xl font-semibold mb-2 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Hi there. What should we code today?
        </h2>
      </div>

      {/* Language Selector */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-white"
          }`}
        >
          Select Language
        </label>
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className={`w-full px-4 py-3 flex items-center justify-between ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
            } border rounded-lg transition-colors`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{currentLanguage?.icon}</span>
              <span className="font-medium">
                {currentLanguage?.label || "Select Language"}
              </span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showLanguageDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div
              className={`absolute top-full left-0 right-0 mt-1 ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              } border rounded-lg shadow-lg z-10`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    setLanguage(lang.value);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center space-x-3 text-left transition-colors ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"
                  } ${
                    language === lang.value
                      ? darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-900"
                      : darkMode
                      ? "text-gray-100"
                      : "text-gray-900"
                  }`}
                >
                  <span className="text-lg">{lang.icon}</span>
                  <span className="font-medium">{lang.label}</span>
                  {language === lang.value && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${
            darkMode ? "text-gray-300" : "text-white"
          }`}
        >
          Describe what code you need
        </label>
        <div
          className={`${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-300"
          } rounded-lg border overflow-hidden`}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end p-4">
              <div className="flex-1 relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Write a function to reverse a string..."
                  className={`w-full bg-transparent ${
                    darkMode
                      ? "text-gray-100 placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  } resize-none outline-none text-lg leading-relaxed`}
                  rows={isExpanded ? 4 : 2}
                  onFocus={() => setIsExpanded(true)}
                  onBlur={(e) => {
                    if (!e.target.value.trim()) {
                      setIsExpanded(false);
                    }
                  }}
                />
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {/* Voice input button */}
                <button
                  type="button"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                  }`}
                  title="Voice input"
                >
                  <Mic
                    size={20}
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  />
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className={`p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center`}
                >
                  {loading ? (
                    <div className="animate-spin">
                      <Code size={20} />
                    </div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Quick suggestions */}
      {!prompt && (
        <div className="flex flex-wrap gap-2">
          {[
            "Create a function",
            "Sort an array",
            "Reverse a string",
            "Generate fibonacci",
            "Parse JSON data",
            "Validate email",
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setPrompt(suggestion)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                darkMode
                  ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModernPromptInput;
