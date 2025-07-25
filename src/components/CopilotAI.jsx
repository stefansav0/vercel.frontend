import { useState } from "react";

const AiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer YOUR_API_KEY", // ✅ Use your real API key
          "Content-Type": "application/json",
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
      setResponse("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Icon Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700"
        >
          💬
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="w-80 h-[450px] bg-white border rounded shadow-lg p-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Copilot AI</h3>
            <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-red-500">✕</button>
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
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AiChatWidget;
