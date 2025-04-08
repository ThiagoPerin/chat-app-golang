package main

import (
	"log"
	"net/http"

	"github.com/ThiagoPerin/chat-app-golang/handlers"
)

func main() {
	http.HandleFunc("/ws", handlers.HandleConnections) // Define a rota para a função handleConnections)

	go handlers.HandleMessages()

	log.Println("WebSocket server started on ws://localhost:8081/ws")
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}
