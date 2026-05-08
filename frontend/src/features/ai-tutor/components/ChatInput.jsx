import { useState } from "react";

export default function ChatInput({
  onSend,
  loading,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim() || loading) return;

    onSend(message);

    setMessage("");
  };

  return (
    <div className="border-t border-white/10 p-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}