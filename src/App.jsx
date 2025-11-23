import React, { useState, useEffect } from "react";
import { mockAPI } from "./templates";
import Header from "./components/Header";
import SimplePromptInput from "./components/SimplePromptInput";
import CodeOutput from "./components/CodeOutput";
import RecentHistory from "./components/RecentHistory";
import HistoryTab from "./components/HistoryTab";
import SettingsModal from "./components/SettingsModal";
import LoginModal from "./components/LoginModal";
import UserDisplay from "./components/UserDisplay";
import ResizablePanel from "./components/ResizablePanel";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? Number(saved) : 14;
  });
  const [lineHeight, setLineHeight] = useState(() => {
    const saved = localStorage.getItem("lineHeight");
    return saved ? Number(saved) : 1.5;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const [showHistoryTab, setShowHistoryTab] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("lineHeight", lineHeight);
  }, [lineHeight]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await mockAPI.generate(prompt, language);
      setCode(result.code);

      const newItem = {
        id: Date.now(),
        prompt,
        language,
        code: result.code,
        timestamp: new Date().toISOString(),
        favorite: false,
      };

      setHistory([newItem, ...history]);
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleSelectHistory = (item) => {
    setPrompt(item.prompt);
    setLanguage(item.language);
    setCode(item.code);
  };

  const handleToggleFavorite = (id) => {
    setHistory(
      history.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const handleDeleteHistory = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const handleHistoryTabToggle = (show) => {
    setShowHistoryTab(show);
  };

  const handleViewAllHistory = () => {
    setShowHistoryTab(true);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLoginClick = () => {
    if (user) {
      handleLogout();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors flex flex-col">
        <Header
          onSettingsClick={() => setShowSettings(true)}
          onHistoryClick={handleHistoryTabToggle}
          showHistoryTab={showHistoryTab}
          user={user}
          onLoginClick={handleLoginClick}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <main className="flex-1 overflow-hidden">
          {showHistoryTab ? (
            // Full History Tab View
            <div className="h-full bg-white dark:bg-gray-800">
              <HistoryTab
                history={history}
                onSelect={(item) => {
                  handleSelectHistory(item);
                  setShowHistoryTab(false);
                }}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteHistory}
                onBack={() => setShowHistoryTab(false)}
                darkMode={darkMode}
              />
            </div>
          ) : (
            // Main Code View with Resizable Panels
            <div className="h-full p-4">
              <ResizablePanel
                defaultLeftWidth={35}
                minLeftWidth={25}
                maxLeftWidth={60}
                leftPanel={
                  <div className="h-full flex flex-col space-y-4 pr-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <SimplePromptInput
                        prompt={prompt}
                        setPrompt={setPrompt}
                        language={language}
                        setLanguage={setLanguage}
                        onGenerate={handleGenerate}
                        loading={loading}
                        darkMode={darkMode}
                      />
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1 overflow-hidden">
                      <RecentHistory
                        history={history}
                        onSelect={handleSelectHistory}
                        onToggleFavorite={handleToggleFavorite}
                        onDelete={handleDeleteHistory}
                        onViewAll={handleViewAllHistory}
                        darkMode={darkMode}
                      />
                    </div>
                  </div>
                }
                rightPanel={
                  <div className="h-full pl-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
                      <CodeOutput
                        code={code}
                        language={language}
                        darkMode={darkMode}
                        fontSize={fontSize}
                        lineHeight={lineHeight}
                        onCopy={handleCopy}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          )}
        </main>

        <SettingsModal
          show={showSettings}
          onClose={() => setShowSettings(false)}
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          darkMode={darkMode}
        />

        <LoginModal
          show={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          darkMode={darkMode}
        />

        <UserDisplay user={user} onLogout={handleLogout} darkMode={darkMode} />
      </div>
    </div>
  );
}
