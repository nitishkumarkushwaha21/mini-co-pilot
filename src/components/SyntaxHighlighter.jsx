import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code } from "lucide-react";

const CodeSyntaxHighlighter = ({
  code,
  language,
  darkMode,
  fontSize,
  lineHeight,
}) => {
  return (
    <div className="rounded-lg overflow-hidden border dark:border-gray-600">
      {code ? (
        <SyntaxHighlighter
          language={language === "cpp" ? "cpp" : language}
          style={darkMode ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}`,
            maxHeight: "500px",
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <div className="p-8 text-center text-gray-400 dark:bg-gray-800">
          <Code size={48} className="mx-auto mb-3 opacity-50" />
          <p>Your generated code will appear here</p>
        </div>
      )}
    </div>
  );
};

export default CodeSyntaxHighlighter;
