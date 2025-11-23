import React from "react";
import { Star, Trash2 } from "lucide-react";

const HistoryItem = ({
  item,
  onSelect,
  onToggleFavorite,
  onDelete,
  darkMode,
}) => {
  return (
    <div
      className={`p-3 rounded-lg border ${
        darkMode
          ? "border-gray-700 hover:bg-gray-700"
          : "border-gray-200 hover:bg-gray-50"
      } cursor-pointer transition`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 mr-2" onClick={() => onSelect(item)}>
          <p
            className={`text-sm font-medium line-clamp-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {item.prompt}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
              {item.language}
            </span>
            <span
              className={`text-xs opacity-60 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`p-1 ${
              darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"
            } rounded`}
          >
            <Star
              size={14}
              className={
                item.favorite
                  ? "fill-yellow-400 text-yellow-400"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className={`p-1 hover:bg-red-500 hover:bg-opacity-20 rounded text-red-600`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
