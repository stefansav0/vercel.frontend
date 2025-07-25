// components/FloatingChatButton.jsx
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import CopilotAI from "./CopilotAI"; // Make sure this is your AI component

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Box Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-200">
          <CopilotAI />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
