"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Playpen_Sans } from "next/font/google";
import { IoClose, IoChatbubbleEllipses, IoSend } from "react-icons/io5";
import ThemeContext from "../context/ThemeContext";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm Harsh's AI assistant. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useContext(ThemeContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again later.",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Couldn't reach the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Hint popup */}
      {!isOpen && showHint && (
        <div className="fixed bottom-[5.5rem] right-6 z-50 animate-slideUp">
          <div className={`relative px-4 py-2 rounded-xl shadow-lg text-sm whitespace-nowrap backdrop-blur-md ${
            theme === "dark" ? "bg-gray-800/70 text-gray-200" : "bg-white/70 text-gray-800"
          }`}>
            <span>Ask me about <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Harsh</strong> here! 💬</span>
            <button
              onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
              className="ml-2 text-gray-400 hover:text-gray-600 text-xs"
              aria-label="Dismiss hint"
            >✕</button>
            {/* Triangle pointer */}
            <div className={`absolute -bottom-2 right-5 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] ${
              theme === "dark" ? "border-t-gray-800/70" : "border-t-white/70"
            }`} />
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowHint(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
        aria-label="Chat with AI"
      >
        {isOpen ? <IoClose size={26} /> : <IoChatbubbleEllipses size={26} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`${playpenSans.className} fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-300 animate-slideUp ${
            theme === "dark"
              ? "bg-[#1a1a2e] border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-lg font-bold">
              H
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">
                Ask about Harsh
              </p>
              <p className="text-white/70 text-xs">AI-powered assistant</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className={`flex-1 overflow-y-auto p-4 space-y-3 ${
              theme === "dark" ? "scrollbar-dark" : ""
            }`}
            style={{ minHeight: "200px", maxHeight: "calc(70vh - 120px)" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-200 rounded-bl-sm"
                      : "bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className={`px-4 py-3 rounded-2xl rounded-bl-sm text-sm ${
                    theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className={`flex-shrink-0 p-3 border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Harsh..."
                disabled={loading}
                className={`flex-1 text-sm px-4 py-2.5 rounded-full outline-none transition-all ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-1 focus:ring-purple-500"
                    : "bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-purple-500"
                }`}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <IoSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
