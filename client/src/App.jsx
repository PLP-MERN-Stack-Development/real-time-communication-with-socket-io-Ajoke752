import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "./socket/socket";
import Login from "./components/Login";
import Chat from "./components/Chat";

export default function App() {
  const { socket, isConnected } = useSocket();
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    socket.connect();
    socket.emit("user_join", name);
    setLoggedIn(true);
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}
