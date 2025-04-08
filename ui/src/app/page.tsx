"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/custom/button/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ChatApp = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");

  function handleEnterChat(e: { preventDefault: () => void; }) {
    e.preventDefault();
    localStorage.setItem("username", username);
    router.push("/livechat");
  }

  return (
    <div className="h-screen w-screen relative flex flex-col items-center justify-center gap-10 p-4">
      <h1 className="text-8xl font-extralight text-center">Live Chat App</h1>
      <Card className="w-full max-w-xl">
        <CardContent>
          <form onSubmit={handleEnterChat} className="grid w-full gap-3 items-center">
            <Input id="username" placeholder="Enter your username..." value={username} onInput={(e) => setUsername(e.currentTarget.value)} required />
            <Button className="w-full" type="submit">Enter Chat</Button>
          </form>
        </CardContent>
      </Card>
      <ModeToggle />
    </div>
  );
};

export default ChatApp;