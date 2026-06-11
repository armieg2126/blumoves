"use client";
import { useEffect, useRef, useState } from "react";

const PHONE_TEL = "9732160926";

const SEED = {
  role: "assistant",
  content:
    "Hey! 👋 I'm the BluMoves assistant. Tell me a bit about your move and I'll get you a quick estimate — then we'll call you with your exact price.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([SEED]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const threadRef = useRef(null);

  // Auto-scroll the thread (not the page) as messages stream in.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    // Placeholder assistant message we stream tokens into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        let msg = "Sorry — I'm having trouble right now. Please call us at 973-216-0926.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: msg };
          return copy;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry — I'm having trouble right now. Please call us at 973-216-0926.",
        };
        return copy;
      });
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // While streaming, the last assistant message may still be empty.
  const lastMsg = messages[messages.length - 1];
  const showTyping = sending && lastMsg?.role === "assistant" && lastMsg.content === "";

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="BluMoves Assistant">
          <div className="chat-header">
            <div className="chat-header-main">
              <span className="chat-dot" />
              <div>
                <div className="chat-title">BluMoves Assistant</div>
                <div className="chat-tag">Easy &amp; Done</div>
              </div>
            </div>
            <button
              type="button"
              className="chat-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-thread" ref={threadRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-ai"}`}
              >
                {m.content}
              </div>
            ))}
            {showTyping && (
              <div className="chat-msg chat-msg-ai chat-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              type="text"
              placeholder="Tell us about your move…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              type="button"
              className="chat-send"
              aria-label="Send message"
              onClick={send}
              disabled={sending || input.trim() === ""}
            >
              ➤
            </button>
          </div>

          <a href={`tel:${PHONE_TEL}`} className="chat-call-link">
            Prefer to talk? Call 973-216-0926
          </a>
        </div>
      )}
    </>
  );
}
