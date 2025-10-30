import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin(name.trim());
  };

  return (
    <div className="login">
      <h2>Join Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
