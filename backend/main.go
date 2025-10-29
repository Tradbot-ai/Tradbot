package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
    // Connect to PostgreSQL
    connStr := "user=postgres dbname=trades sslmode=disable"
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal("❌ Failed to connect to DB:", err)
    }
    defer db.Close()

    fmt.Println("✅ Connected to PostgreSQL")

    // Define API endpoints
    http.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"message": "Hello from Go backend!"})
    })

    http.HandleFunc("/api/time", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"server_time": fmt.Sprint(time.Now())})
    })

    // Trades API
    http.HandleFunc("/api/trades", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodGet {
            rows, err := db.Query("SELECT symbol, quantity, price FROM trades")
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            defer rows.Close()

            var trades []map[string]interface{}
            for rows.Next() {
                var symbol string
                var quantity int
                var price float64
                rows.Scan(&symbol, &quantity, &price)
                trades = append(trades, map[string]interface{}{
                    "symbol":   symbol,
                    "quantity": quantity,
                    "price":    price,
                })
            }
            json.NewEncoder(w).Encode(trades)
        }
    })

    fmt.Println("🚀 Server running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}


// ---- Handlers ----

func handleHello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Hello from Go backend 👋",
	})
}

func handleTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"server_time": time.Now().Format(time.RFC3339),
	})
}

func handleTrades(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "GET" {
		rows, err := db.Query("SELECT id, symbol, qty, price, created_at FROM trades ORDER BY id DESC")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		type Trade struct {
			ID        int       `json:"id"`
			Symbol    string    `json:"symbol"`
			Qty       int       `json:"qty"`
			Price     float64   `json:"price"`
			CreatedAt time.Time `json:"created_at"`
		}

		var trades []Trade
		for rows.Next() {
			var t Trade
			if err := rows.Scan(&t.ID, &t.Symbol, &t.Qty, &t.Price, &t.CreatedAt); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			trades = append(trades, t)
		}

		json.NewEncoder(w).Encode(trades)
		return
	}

	if r.Method == "POST" {
		var t struct {
			Symbol string  `json:"symbol"`
			Qty    int     `json:"qty"`
			Price  float64 `json:"price"`
		}
		if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		_, err := db.Exec("INSERT INTO trades (symbol, qty, price) VALUES ($1, $2, $3)", t.Symbol, t.Qty, t.Price)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{
			"status": "Trade added successfully ✅",
		})
		return
	}

	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}
