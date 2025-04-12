"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatMessage from "@/components/custom/chat/ChatMessage";
import { ModeToggle } from '@/components/custom/button/ModeToggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { House, MessageCircleOff, Send } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <div className="h-screen w-screen relative flex flex-col items-center justify-center p-4 space-y-2">
            <Card className="w-full max-w-xl h-fit p-4">
                <CardHeader>
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>Welcome to the chat <strong>{username}</strong>, let's have a conversation</CardDescription>
                </CardHeader>
                <CardContent className='w-full h-[60vh] rounded-2xl p-0 overflow-hidden border'>
                    {messages.length > 0 ? (
                        <ScrollArea className="w-full h-full p-4">
                            {messages.map((msg, index) => (
                                <ChatMessage msg={msg} index={index} username={username} key={index} />
                            ))}
                        </ScrollArea>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                            <MessageCircleOff className="h-[6rem] w-[6rem]" />
                            <p className="text-xl font-extralight text-center">There are no messages for you yet, please start a conversation.</p>
                        </div>
                    )}
                </CardContent>
                <form onSubmit={sendMessage} className="flex gap-2 w-full p-4 rounded-lg border">
                    <Input type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} required />
                    <Button type="submit" variant="outline" size="icon">
                        <Send className='h-[1.2rem] w-[1.2rem] scale-100 transition-all' />
                    </Button>
                </form>
            </Card>
            <Button variant="outline" size="icon" className="absolute top-2 left-2" onClick={() => router.push("/")}>
                <House className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
            </Button>
            <ModeToggle />
        </div>
    );
};

export default ChatApp;