"use client";
import { useEffect, useState } from "react";

type Message = {
  username: string;
  message: string;
};

const ChatApp = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8081/ws");

    websocket.onmessage = (event) => {
      const msg: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    setWs(websocket);

    return () => websocket.close();
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (ws && message.trim() !== "") {
      ws.send(JSON.stringify({ username, message }));
      setMessage("");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-green-200 p-4">
      <ul className="w-full max-w-md h-64 overflow-y-auto bg-white p-2 rounded shadow-md">
        {messages.map((msg, index) => (
          <>
            {msg.username === username ? (
              <li key={index} className="p-2 border-b border-gray-300 flex items-center justify-end bg-green-500">
                <strong>{msg.username}:</strong> {msg.message}
              </li>
            ) : (
              <li key={index} className="p-2 border-b border-gray-300 flex items-center justify-start bg-blue-500">
                <strong>{msg.username}:</strong> {msg.message}
              </li>
            )}
          </>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex flex-col gap-2 mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;