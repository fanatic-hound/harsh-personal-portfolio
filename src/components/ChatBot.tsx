"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { IoClose, IoChatbubbleEllipses, IoSend } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";
import ChibiAvatar from "./ChibiAvatar";

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
        "Hey! I'm Harsh's AI assistant. Ask me anything about his skills, experience, or projects!",
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
      <AnimatePresence>
        {!isOpen && showHint && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[4.5rem] sm:bottom-[5.5rem] right-4 sm:right-6 z-50"
          >
            <div className="pixel-card relative px-3 sm:px-4 py-1.5 sm:py-2 font-terminal text-base sm:text-lg whitespace-nowrap uppercase">
              <span>Ask about <strong className="text-pixel-pink">Harsh</strong></span>
              <button
                onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
                className="ml-2 text-muted hover:text-ink text-sm cursor-pointer"
                aria-label="Dismiss hint"
              >✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowHint(false); }}
        className="pixel-lift fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-pixel-pink text-white border-[3px] border-ink shadow-hard flex items-center justify-center cursor-pointer"
        aria-label="Chat with AI"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
              <IoClose className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
              <IoChatbubbleEllipses className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pixel-card fixed bottom-[4.25rem] sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[380px] max-h-[60vh] sm:max-h-[70vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-pixel-pink border-b-[3px] border-ink px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-7 h-7 sm:w-9 sm:h-9 border-2 border-ink flex items-center justify-center overflow-hidden">
                <ChibiAvatar variant="head" size={30} />
              </div>
              <div className="flex-1">
                <p className="text-white font-terminal text-base sm:text-lg uppercase tracking-wide leading-none">
                  Ask about Harsh
                </p>
                <p className="text-white/80 font-terminal text-sm uppercase">AI assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <IoClose className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 bg-paper ${
                theme === "dark" ? "scrollbar-dark" : ""
              }`}
              style={{ minHeight: "150px", maxHeight: "calc(60vh - 100px)" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-ink text-xs sm:text-sm leading-relaxed font-body ${
                      msg.role === "user"
                        ? "bg-pixel-pink text-white"
                        : "bg-surface"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border-2 border-ink px-4 py-3 text-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-pixel-pink animate-blinkStep" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-pixel-yellow animate-blinkStep" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-pixel-lime animate-blinkStep" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-2 sm:p-3 border-t-[3px] border-ink bg-surface">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Harsh..."
                  disabled={loading}
                  aria-label="Message"
                  className="flex-1 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 bg-paper border-2 border-ink outline-none focus:shadow-hard-sm transition-shadow font-body"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-pixel-pink text-white border-2 border-ink flex items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex-shrink-0"
                >
                  <IoSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
