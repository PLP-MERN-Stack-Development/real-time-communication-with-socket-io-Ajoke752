import React, { useState } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    let image = null;
    if (file) {
      // Convert to base64
      image = await toBase64(file);
    }

    onSend({ message: text, image });
    setText("");
    setFile(null);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form className="message-input" onSubmit={handleSend}>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onTyping && onTyping(true);
        }}
        placeholder="Type a message..."
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Send</button>
    </form>
  );
}
