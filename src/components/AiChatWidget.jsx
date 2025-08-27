// src/components/GeminiChatWidget.jsx
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY"); // 🔒 Replace with your key securely

const GeminiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const text = await result.response.text();
      setResponse(text);
    } catch (err) {
      setResponse("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        >
          💬
        </button>
      )}

      {open && (
        <div className="w-80 h-[450px] bg-white border rounded shadow-lg p-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Gemini AI</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 border rounded bg-gray-50 text-sm whitespace-pre-wrap">
            {response || "Ask me anything..."}
          </div>
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiChatWidget;
