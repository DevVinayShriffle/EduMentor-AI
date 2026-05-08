import ReactMarkdown from "react-markdown";

export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-7 ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-white/10 text-slate-100"
        }`}
      >
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}