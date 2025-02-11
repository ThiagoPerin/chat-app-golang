"use client";
import { Send } from 'lucide-react';
import ChatMessage from "@/components/custom/chat/ChatMessage";
import { useEffect, useState } from "react";

type Message = {
    username: string;
    message: string;
};

const ChatApp = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const username = localStorage.getItem("username");
    if (!username) {
        window.location.href = "/";
    }

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
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-sky-950 p-4 space-y-2">
            <div className="text-3xl text-white font-extralight text-center">Welcome to the chat <strong>{username}</strong> !!!</div>
            <div className="w-full max-w-[600px] h-fit bg-sky-900 p-4 rounded-3xl shadow-md">
                <ul className="w-full h-[70vh] overflow-y-auto p-2 rounded-lg mb-2 bg-sky-950 overflow-hidden">
                    {messages.map((msg, index) => (
                        <ChatMessage msg={msg} index={index} username={username} />
                    ))}
                </ul>
                <form onSubmit={sendMessage} className="flex gap-2 w-full bg-sky-95000 p-4 rounded-lg">
                    <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required className="p-2 border rounded w-full" />
                    <button type="submit" className="h-10 aspect-square flex items-center justify-center p-2 bg-green-600 text-white rounded-full"><Send size={20} /></button>
                </form>
            </div>
        </div>
    );
};

export default ChatApp;