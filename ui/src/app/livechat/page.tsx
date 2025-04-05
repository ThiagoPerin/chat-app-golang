"use client";
import { Send } from 'lucide-react';
import ChatMessage from "@/components/custom/chat/ChatMessage";
import { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";
import { ModeToggle } from '@/components/custom/button/ModeToggle';

type Message = {
    username: string;
    message: string;
};

const ChatApp = () => {
    const router = useRouter();
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            router.push("/");
        }
        
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
        <div className="h-screen w-screen relative flex flex-col items-center justify-center bg-white dark:bg-black p-4 space-y-2">
            <div className="text-3xl dark:text-white text-black font-extralight text-center">Welcome to the chat <strong>{username}</strong> !!!</div>
            <div className="w-full max-w-[600px] h-fit bg-white dark:bg-black border border-black dark:border-white p-4 rounded-3xl shadow-md">
                <ul className="w-full h-[70vh] overflow-y-auto p-2 rounded-lg mb-2 bg-white dark:bg-black border border-black dark:border-white overflow-hidden">
                    {messages.map((msg, index) => (
                        <ChatMessage msg={msg} index={index} username={username} key={index}/>
                    ))}
                </ul>
                <form onSubmit={sendMessage} className="flex gap-2 w-full bg-sky-95000 p-4 rounded-lg">
                    <Input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                    <Button type="submit" className="h-10 aspect-square flex items-center justify-center p-2 bg-green-600 text-white rounded-full"><Send size={20} /></Button>
                </form>
            </div>
             <ModeToggle />
        </div>
    );
};

export default ChatApp;