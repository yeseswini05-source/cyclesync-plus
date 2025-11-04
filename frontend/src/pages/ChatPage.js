import React, { useEffect, useState } from "react";

export default function ChatPage() {
  const API_BASE = "http://localhost:5000";

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  // load chat history when page mounts
  useEffect(() => {
    async function loadChat() {
      try {
        const res = await fetch(`${API_BASE}/api/chat/history`);
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("error loading chat history:", err);
      }
    }
    loadChat();
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (!draft.trim()) return;

    setSending(true);
    const text = draft;

    try {
      const res = await fetch(`${API_BASE}/api/chat/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}` later
        },
        body: JSON.stringify({ text }),
      });

      const reply = await res.json();

      // optimistic append: user message then (maybe) server reply
      setMessages((prev) => [
        ...prev,
        {
          from: "you",
          text,
          at: new Date().toISOString(),
        },
        ...(reply
          ? [
              {
                from: reply.from || "assistant",
                text: reply.text || "(no response)",
                at: reply.at || new Date().toISOString(),
              },
            ]
          : []),
      ]);

      setDraft("");
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 flex flex-col h-[80vh]">
      <h1 className="text-2xl font-semibold text-roseDeep mb-2">
        Chat
      </h1>
      <p className="text-night/60 text-sm mb-4">
        Ask questions, vent, track symptoms, or just talk. We’re here.
      </p>

      {/* chat window */}
      <div className="flex-1 overflow-y-auto border border-night/10 bg-white rounded-xl shadow-soft p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-night/50 text-sm text-center">
            No messages yet. Say hi 🌷
          </div>
        )}

        {messages.map((m, idx) => (
          <div
            key={idx}
            className={
              m.from === "you"
                ? "text-right"
                : "text-left"
            }
          >
            <div
              className={
                "inline-block max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-relaxed shadow-soft " +
                (m.from === "you"
                  ? "bg-gradient-to-r from-roseMain to-roseDeep text-white"
                  : "bg-roseBg/60 border border-roseMain/30 text-night/80")
              }
            >
              <div className="font-medium text-[11px] mb-1 opacity-80">
                {m.from === "you" ? "You" : m.from || "Support"}
              </div>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-[10px] opacity-50 mt-1">
                {new Date(m.at || Date.now()).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* input bar */}
      <form
        onSubmit={sendMessage}
        className="mt-4 flex items-center gap-2"
      >
        <input
          className="flex-1 rounded-full border border-night/10 bg-white text-night/80 text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-roseMain/30 shadow-soft"
          placeholder="Type your message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-gradient-to-r from-roseMain to-roseDeep text-white text-sm font-medium px-4 py-2 shadow-card disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "..." : "Send"}
        </button>
      </form>
    </main>
  );
}
