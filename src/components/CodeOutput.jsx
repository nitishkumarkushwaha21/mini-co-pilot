import React, { useState } from "react";
import { Copy } from "lucide-react";
import CodeSyntaxHighlighter from "./SyntaxHighlighter";

const CodeOutput = ({
  code,
  language,
  darkMode,
  fontSize,
  lineHeight,
  onCopy,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Generated Code</h3>
        <button
          onClick={handleCopy}
          disabled={!code}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Copy size={16} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      <CodeSyntaxHighlighter
        code={code}
        language={language}
        darkMode={darkMode}
        fontSize={fontSize}
        lineHeight={lineHeight}
      />
    </div>
  );
};

export default CodeOutput;
