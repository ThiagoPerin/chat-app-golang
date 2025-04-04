"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { MessageCircle } from 'lucide-react';

const ChatApp = () => {
  const [username, setUsername] = useState("");
  
  function handleEnterChat(e: { preventDefault: () => void; }) {
    e.preventDefault();
    localStorage.setItem("username", username);
    window.location.href = "/livechat";
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-sky-950 p-4">
      <div className="h-fit w-fit min-w-[200px] bg-sky-900 rounded-lg flex flex-col items-center justify-center space-y-6 p-6">
        <div className="text-6xl flex gap-4 font-bold text-white text-center"><h1 className="w-fit">Live Chat App</h1> <MessageCircle size={60}/></div>
        <form className="w-full space-y-2" onSubmit={handleEnterChat}>
          <Label htmlFor="username" className="text-lg text-white">Username</Label>
          <Input id="username" placeholder="Type your username..." value={username} onInput={(e) => setUsername(e.currentTarget.value)} required />
          <Button className="mt-2 w-full text-md" type="submit">Enter Chat</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;