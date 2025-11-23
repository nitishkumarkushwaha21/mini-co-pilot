import React, { useState } from "react";
import { History, Star, Search } from "lucide-react";
import HistoryItem from "./HistoryItem";

const HistoryPanel = ({
  history,
  onSelect,
  onToggleFavorite,
  onDelete,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorite = !filterFavorites || item.favorite;
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold flex items-center space-x-2 ${
            darkMode ? "text-gray-100" : "text-white"
          }`}
        >
          <History size={20} />
          <span>History</span>
        </h3>
        <button
          onClick={() => setFilterFavorites(!filterFavorites)}
          className={`p-2 rounded ${
            filterFavorites ? "bg-yellow-100 dark:bg-yellow-900" : ""
          }`}
          title="Show favorites"
        >
          <Star
            size={16}
            className={filterFavorites ? "fill-yellow-400 text-yellow-400" : ""}
          />
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
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
          <p className="text-center text-gray-400 py-8">No history found</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
