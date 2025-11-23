import React, { useState } from "react";
import { User, LogIn, UserPlus, Loader } from "lucide-react";

const LoginModal = ({ show, onClose, onLogin, darkMode }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userData = {
      username: username.trim(),
      email: isSignup ? email.trim() : "",
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("user", JSON.stringify(userData));
    onLogin(userData);
    setLoading(false);
    onClose();

    // Reset form
    setUsername("");
    setEmail("");
    setIsSignup(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`${
          darkMode
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        } rounded-lg p-6 max-w-md w-full mx-4 border`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 mb-6">
          <User size={24} />
          <h2 className="text-xl font-bold">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username *</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                } focus:ring-2 focus:ring-blue-500 outline-none`}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {isSignup ? <UserPlus size={20} /> : <LogIn size={20} />}
                <span>{isSignup ? "Sign Up" : "Login"}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm hover:underline"
            disabled={loading}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <button
          onClick={onClose}
          className={`mt-4 w-full border ${
            darkMode
              ? "border-gray-600 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-100"
          } py-2 rounded-lg transition`}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
