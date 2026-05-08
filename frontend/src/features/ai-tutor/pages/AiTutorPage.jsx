import { useEffect, useRef, useState } from "react";

import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import TypingLoader from "../components/TypingLoader";

import { sendMessage } from "../api/aiTutorApi";

export default function AiTutorPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello 👋 I am EduMentor AI. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSendMessage = async (message) => {
    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setLoading(true);

    try {
      const response = await sendMessage(updatedMessages);

      const aiMessage = {
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while generating response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-tutor" className="flex h-screen flex-col bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <h1 className="text-2xl font-bold">
          AI Tutor
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Ask doubts, concepts, numericals, coding, and more.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

          {loading && <TypingLoader />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSendMessage}
        loading={loading}
      />
    </div>
  );
}