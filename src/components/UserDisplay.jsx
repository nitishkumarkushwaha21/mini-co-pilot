import React from "react";
import { User, LogOut } from "lucide-react";

const UserDisplay = ({ user, onLogout, darkMode }) => {
  if (!user) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div
        className={`${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200 text-gray-900"
        } rounded-lg p-3 shadow-lg border flex items-center space-x-3`}
      >
        <div className="p-2 bg-blue-600 text-white rounded-full">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs opacity-75">Online</p>
        </div>
        <button
          onClick={onLogout}
          className={`p-1 ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } rounded transition`}
          title="Logout"
        >
          <LogOut size={14} />
        </button>
      </div>
    </div>
  );
};

export default UserDisplay;
