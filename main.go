package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Resumo do funcionamento:
// 	#1 O servidor inicia e serve arquivos estáticos.
// 	#2 Clientes conectam ao servidor WebSocket via /ws.
// 	#3 Quando um cliente envia uma mensagem, handleConnections a recebe e repassa ao canal broadcast.
// 	#4 handleMessages escuta o canal broadcast e envia a mensagem para todos os clientes conectados.
// 	#5 Esse código implementa um chat em tempo real usando WebSockets.

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

func main() {
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	http.HandleFunc("/ws", handleConnections)

	go handleMessages()

	log.Println("HTTP server started on http://localhost:8081/")
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	clients[ws] = true

	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
