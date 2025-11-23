import React, { useState, useCallback, useEffect } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const ResizablePanel = ({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 40,
  minLeftWidth = 20,
  maxLeftWidth = 70,
  darkMode = false,
}) => {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastWidth, setLastWidth] = useState(defaultLeftWidth);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const container = document.getElementById("resizable-container");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newLeftWidth >= minLeftWidth && newLeftWidth <= maxLeftWidth) {
        setLeftWidth(newLeftWidth);
      }
    },
    [isDragging, minLeftWidth, maxLeftWidth]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleCollapse = () => {
    if (isCollapsed) {
      setLeftWidth(lastWidth);
      setIsCollapsed(false);
    } else {
      setLastWidth(leftWidth);
      setLeftWidth(0);
      setIsCollapsed(true);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div id="resizable-container" className="flex h-full w-full relative">
      {/* Collapse Toggle Button */}
      <button
        onClick={toggleCollapse}
        className={`absolute top-2 ${
          isCollapsed ? "left-2" : "left-2"
        } z-10 p-1.5 ${
          darkMode
            ? "bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white"
            : "bg-gray-50/80 hover:bg-gray-100/80 text-gray-600 hover:text-gray-900"
        } rounded-md transition-all backdrop-blur-sm border-0`}
        title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
      >
        {isCollapsed ? (
          <PanelLeftOpen size={14} />
        ) : (
          <PanelLeftClose size={14} />
        )}
      </button>

      {/* Left Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isCollapsed ? "opacity-0" : "opacity-100"
        }`}
        style={{ width: `${leftWidth}%` }}
      >
        {!isCollapsed && leftPanel}
      </div>

      {/* Resizer */}
      {!isCollapsed && (
        <div
          className={`w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize shrink-0 transition-colors ${
            isDragging ? "bg-blue-500" : ""
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-0.5 h-8 bg-gray-400 rounded-full opacity-50"></div>
          </div>
        </div>
      )}

      {/* Right Panel */}
      <div
        className="overflow-hidden flex-1 transition-all duration-300"
        style={{ width: isCollapsed ? "100%" : `${100 - leftWidth}%` }}
      >
        {rightPanel}
      </div>
    </div>
  );
};

export default ResizablePanel;
