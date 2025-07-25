import { useState } from "react";

const AiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // ✅ Use your real API key
          "Content-Type": "application/json",
          "HTTP-Referer": "https://finderight.com", // ✅ Optional but helps OpenRouter allow usage
          "X-Title": "Finderight Copilot AI",       // ✅ Optional
        },
        body: JSON.stringify({
          model: "openchat/openchat-3.5",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();
      const message = data?.choices?.[0]?.message?.content;
      setResponse(message || "No response.");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 text-xl"
        >
          💬
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="w-80 h-[460px] bg-white border rounded-lg shadow-lg p-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-800">Copilot AI</h3>
            <button onClick={() => setOpen(false)} className="text-lg text-gray-500 hover:text-red-500">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 border rounded bg-gray-100 text-sm whitespace-pre-wrap mb-2">
            {response || "Ask me anything..."}
          </div>

          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded resize-none"
            placeholder="Type your message..."
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AiChatWidget;
