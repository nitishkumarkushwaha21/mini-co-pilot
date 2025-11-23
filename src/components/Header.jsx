import React from "react";
import { Settings, History, User, LogIn, Moon, Sun } from "lucide-react";
import logo from "../assets/lgo1.png";

const Header = ({
  onSettingsClick,
  onHistoryClick,
  showHistoryTab,
  user,
  onLoginClick,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Mini Code Copilot Logo" 
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-blue-400">Mini</span>
                <span className="text-white"> Code </span>
                <span className="text-blue-300">Copilot</span>
              </h1>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => onHistoryClick(false)}
              className={`px-4 py-2 rounded-lg transition ${
                !showHistoryTab
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => onHistoryClick(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                showHistoryTab
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <History size={16} />
              <span>History</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-700 transition"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Login/User */}
          <button
            onClick={onLoginClick}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition"
            title={user ? `Logged in as ${user.username}` : "Login"}
          >
            {user ? <User size={20} /> : <LogIn size={20} />}
          </button>

          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-gray-700 transition"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
