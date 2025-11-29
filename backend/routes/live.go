package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

const FinnhubToken = "d4d0ue1r01qt1lah7930d4d0ue1r01qt1lah793g"

var (
	finnhubURL = "wss://ws.finnhub.io?token=" + FinnhubToken

	fhConn   *websocket.Conn      // single global Finnhub connection
	fhOnce   sync.Once            // ensure one connection only
	clients  = make(map[*websocket.Conn]bool)
	upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}
	mu       sync.Mutex
)

// -----------------------------------------------
// 1️⃣ Start Finnhub WebSocket (ONE GLOBAL CONNECTION)
// -----------------------------------------------
func startFinnhub() {
	var err error
	fhConn, _, err = websocket.DefaultDialer.Dial(finnhubURL, nil)
	if err != nil {
		log.Println("Finnhub connect failed:", err)
		return
	}

	log.Println("Connected to Finnhub WS")

	// Read Finnhub messages forever in background
	go func() {
		for {
			var msg interface{}
			err := fhConn.ReadJSON(&msg)
			if err != nil {
				log.Println("Finnhub closed:", err)
				return
			}

			// Broadcast to all connected clients
			broadcast(msg)
		}
	}()
}

// -----------------------------------------------
// 2️⃣ Broadcast to all frontend WS clients
// -----------------------------------------------
func broadcast(msg interface{}) {
	mu.Lock()
	defer mu.Unlock()

	for c := range clients {
		err := c.WriteJSON(msg)
		if err != nil {
			log.Println("WS send error:", err)
			c.Close()
			delete(clients, c)
		}
	}
}

// -----------------------------------------------
// 3️⃣ Handle frontend WebSocket connections
// -----------------------------------------------
func LivePriceStream(w http.ResponseWriter, r *http.Request) {
	// Upgrade browser → WS
	clientWS, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade failed:", err)
		return
	}
	defer clientWS.Close()

	// Add client to map
	mu.Lock()
	clients[clientWS] = true
	mu.Unlock()

	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		clientWS.WriteJSON(map[string]string{"error": "symbol required"})
		return
	}

	log.Println("Client connected for:", symbol)

	// Ensure Finnhub WS is running ONCE
	fhOnce.Do(startFinnhub)

	// Subscribe symbol on Finnhub WS
	subMsg, _ := json.Marshal(map[string]string{
		"type":   "subscribe",
		"symbol": symbol,
	})
	fhConn.WriteMessage(websocket.TextMessage, subMsg)
	log.Println("Subscribed to:", symbol)

	// Keep client connection open
	for {
		_, _, err := clientWS.ReadMessage()
		if err != nil {
			log.Println("Client disconnected:", err)
			mu.Lock()
			delete(clients, clientWS)
			mu.Unlock()
			return
		}
	}
}
