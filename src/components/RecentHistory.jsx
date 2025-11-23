import React from "react";
import { History, Star, Clock } from "lucide-react";
import HistoryItem from "./HistoryItem";

const RecentHistory = ({
  history,
  onSelect,
  onToggleFavorite,
  onDelete,
  onViewAll,
  darkMode,
}) => {
  const recentItems = history.slice(0, 5); // Show only first 5 items

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold flex items-center space-x-2 ${
            darkMode ? "text-gray-100" : "text-white"
          }`}
        >
          <Clock size={20} />
          <span>Recent</span>
        </h3>
        {history.length > 5 && (
          <button
            onClick={onViewAll}
            className={`text-sm ${
              darkMode ? "text-blue-400" : "text-white"
            } hover:underline`}
          >
            View All ({history.length})
          </button>
        )}
      </div>

      <div className="space-y-2">
        {recentItems.length > 0 ? (
          recentItems.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
              onDelete={onDelete}
              darkMode={darkMode}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            <History size={48} className="mx-auto mb-3 opacity-50" />
            <p>No recent generations</p>
            <p className="text-sm mt-1">Your recent code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentHistory;
