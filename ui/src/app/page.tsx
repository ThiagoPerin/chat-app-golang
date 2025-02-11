"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ChatApp = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  function handleEnterChat(e: { preventDefault: () => void; }) {
    e.preventDefault();
    localStorage.setItem("username", username);
    window.location.href = "/livechat";
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-sky-950 p-4">
      <div className="h-fit w-1/3 bg-sky-900 rounded-lg flex flex-col items-center justify-center space-y-4 p-4">
        <h1 className="text-6xl font-bold text-white">Live Chat App</h1>
        <div className="text-2xl text-white">Please enter your username</div>
        <form className="w-full" onSubmit={handleEnterChat}>
          <Input placeholder="Username" className="mt-4" value={username} onInput={(e) => setUsername(e.currentTarget.value)} required/>
          <Button className="mt-4 w-full text-md" type="submit">Enter Chat</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;