import React, { useEffect, useRef } from "react";

export default function MessageList({ messages, onReact, onVisible }) {
  const endRef = useRef();

  useEffect(() => {
    // Scroll to bottom on new message
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Notify parent which messages are visible (for read receipts)
    if (messages && messages.length > 0 && typeof onVisible === "function") {
      const visibleIds = messages.map((m) => m.id);
      onVisible(visibleIds);
    }
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.isPrivate ? "private" : ""}`}>
          {m.system ? (
            <div className="system">{m.message}</div>
          ) : (
            <>
              <div className="meta">
                <strong>{m.sender}</strong>
                <span className="time">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="body">
                {m.message}
                {m.image && (
                  <div className="image-wrap">
                    <img src={m.image} alt="shared" />
                  </div>
                )}
              </div>
              <div className="msg-actions">
                <button onClick={() => onReact(m.id, "❤️")}>❤️</button>
                <button onClick={() => onReact(m.id, "👍")}>👍</button>
              </div>
            </>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
