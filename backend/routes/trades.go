package routes

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Tradbot-ai/Tradbot/backend/database"
)

type Trade struct {
	ID        int       `json:"id"`
	Symbol    string    `json:"symbol"`
	Quantity  int       `json:"quantity"`
	Price     float64   `json:"price"`
	CreatedAt time.Time `json:"created_at"`
}

func TradesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {

	case http.MethodGet:
		rows, err := database.DB.Query(
			"SELECT id, symbol, quantity, price, created_at FROM trades ORDER BY id DESC",
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var trades []Trade

		for rows.Next() {
			var t Trade
			if err := rows.Scan(&t.ID, &t.Symbol, &t.Quantity, &t.Price, &t.CreatedAt); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			trades = append(trades, t)
		}

		json.NewEncoder(w).Encode(trades)
		return

	case http.MethodPost:
		var body struct {
			Symbol   string  `json:"symbol"`
			Quantity int     `json:"quantity"`
			Price    float64 `json:"price"`
		}

		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		_, err := database.DB.Exec(
			"INSERT INTO trades (symbol, quantity, price) VALUES ($1, $2, $3)",
			body.Symbol, body.Quantity, body.Price,
		)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"status": "Trade added"})
		return

	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
