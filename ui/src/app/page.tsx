"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/custom/button/ModeToggle";

const ChatApp = () => {
  const [username, setUsername] = useState("");
  
  function handleEnterChat(e: { preventDefault: () => void; }) {
    e.preventDefault();
    localStorage.setItem("username", username);
    window.location.href = "/livechat";
  }

  // useEffect(() => {
  //   const storedUsername = localStorage.getItem("username");
  //   if (storedUsername) {
  //     setUsername(storedUsername);
  //   }
  // }, [])

  return (
    <div className="h-screen w-screen relative flex items-center justify-center bg-white dark:bg-black p-4">
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Live Chat App</CardTitle>
        <CardDescription>A simple live chat app</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEnterChat}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Type your username..." value={username} onInput={(e) => setUsername(e.currentTarget.value)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={handleEnterChat}>Enter Chat</Button>
      </CardFooter>
    </Card>
        <ModeToggle />
    </div>
  );
};

export default ChatApp;