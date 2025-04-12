
# Chat App in Golang + Next.js

This is a real-time chat project built with Go (Golang) on the backend and React with Next.js on the frontend.
## 🧠 Objective

This project was created with the purpose of studying the implementation of WebSockets on the backend with Go, creating a simple and functional real-time chat.

## 📁 Project Structure

```
chat-app-golang/
├── server/      # Go Backend
└── ui/          # Frontend in Next.js + React + Tailwind
```

## ⚙️ Technologies Used

### Backend
- Go
- [gorilla/websocket](https://github.com/gorilla/websocket)

### Frontend
- Next.js + React
- TypeScript
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.dev)

## 🚀 How to Run Locally

### Prerequisites
- Go installed
- Node.js installed

### Clone the repository

```bash
git clone https://github.com/ThiagoPerin/chat-app-golang.git
```

### Backend

```bash
cd server
go run main.go
```

The server will start on `localhost:8081`.

### Frontend

```bash
cd ui
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## 🔌 Communication

The frontend connects to the backend via WebSocket:
```ts
new WebSocket("ws://localhost:8081/ws")
```

Messages sent and received follow this format:
```json
{
  "username": "Username",
  "message": "Message"
}
```

## 💬 Features

- Global real-time chat (no rooms);
- Interface styled with Tailwind and shadcn/ui;
- Light/Dark mode;
- Local storage for username;

<!-- ## 📸 Preview -->

<!-- ![Chat Screenshot](./screenshot.png) -->
