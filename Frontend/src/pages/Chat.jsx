import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://devtinder-engo.onrender.com"); // Update with your server URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("new-message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off("new-message"); // Cleanup the event listener
    };
  }, []);

  const handleSendMessage = () => {
    if (!messageText || !username) return;

    const messageData = {
      text: messageText,
      user: username,
    };

    // Emit the message to the server
    socket.emit("send-message", messageData);
    setMessageText("");
  };

  return (
    <div>
      <h1>Real-time Chat</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
