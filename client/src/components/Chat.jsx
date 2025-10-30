import React, { useEffect, useState } from "react";
import { useSocket } from "../socket/socket";
import UsersList from "./UsersList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function Chat({ username }) {
  const {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket();

  const [selectedUser, setSelectedUser] = useState(null);
  const [localMessages, setLocalMessages] = useState(messages || []);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // play sound and browser notification on new messages when window not focused
  useEffect(() => {
    if (!lastMessage) return;

    const audio = new Audio("/notification.mp3");
    if (document.hidden) {
      // try browser notification
      if (Notification && Notification.permission === "granted") {
        new Notification(`New message from ${lastMessage.sender}`, {
          body: lastMessage.message,
        });
      }
      audio.play().catch(() => {});
    }
  }, [lastMessage]);

  useEffect(() => {
    // Request notification permission once
    if (Notification && Notification.permission === "default") {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  const handleSend = (payload) => {
    const cb = (ack) => {
      // ack received
      console.log("message ack", ack);
    };

    if (selectedUser) {
      // find selected user's id
      sendPrivateMessage(selectedUser.id, payload.message);
    } else {
      sendMessage(payload, cb);
    }
  };

  const handleReact = (messageId, reaction) => {
    socket.emit("message_reaction", { messageId, reaction });
  };

  const handleVisible = (ids) => {
    // emit read receipts for visible message ids
    if (ids && ids.length) {
      ids.forEach((id) =>
        socket.emit("message_read", { messageId: id, readerId: socket.id })
      );
    }
  };

  return (
    <div className="chat-container">
      <UsersList
        users={users}
        onSelectUser={(u) => setSelectedUser(u)}
        currentUserId={socket.id}
      />

      <main className="chat-main">
        <header className="chat-header">
          <h2>
            Global Chat{" "}
            {selectedUser ? `(DM with ${selectedUser.username})` : ""}
          </h2>
          <div className="status">
            {isConnected ? "Connected" : "Disconnected"}
          </div>
        </header>

        <MessageList
          messages={localMessages}
          onReact={handleReact}
          onVisible={handleVisible}
        />

        <footer className="chat-footer">
          <div className="typing">
            {typingUsers && typingUsers.length > 0 && (
              <em>{typingUsers.join(", ")} typing...</em>
            )}
          </div>
          <MessageInput onSend={handleSend} onTyping={(v) => setTyping(v)} />
        </footer>
      </main>
    </div>
  );
}
