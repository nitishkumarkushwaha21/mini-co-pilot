import React from "react";
import { ArrowLeft } from "lucide-react";
import HistoryPanel from "./HistoryPanel";

const HistoryTab = ({
  history,
  onSelect,
  onToggleFavorite,
  onDelete,
  darkMode,
  onBack,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3 p-6 border-b dark:border-gray-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          title="Back to Code"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold">History</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {history.length} generation{history.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Full History Panel */}
      <div className="flex-1 p-6 overflow-hidden">
        <HistoryPanel
          history={history}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default HistoryTab;
