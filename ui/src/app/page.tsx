"use client";
import { Send } from 'lucide-react';
import ChatMessage from "@/components/chat/ChatMessage";
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-950 p-4">
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-2 border rounded-lg max-w-md w-full my-2" />
      <div className="w-full max-w-md h-fit bg-white p-4 rounded-3xl shadow-md">
        <ul className="w-full h-96 overflow-y-auto p-2 border rounded-lg mb-2 border-gray-400 overflow-hidden">
          {messages.map((msg, index) => (
            <ChatMessage msg={msg} index={index} username={username} />
          ))}
        </ul>
        <form onSubmit={sendMessage} className="flex gap-2 w-full max-w-md bg-sky-950 p-4 rounded-lg">
          <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required className="p-2 border rounded w-full" />
          <button type="submit" className="h-10 aspect-square flex items-center justify-center p-2 bg-green-600 text-white rounded-full"><Send size={20}/></button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;