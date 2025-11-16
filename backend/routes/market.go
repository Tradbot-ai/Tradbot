package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const FinnhubAPIKey = "d42v8kpr01qorletafkgd42v8kpr01qorletafl0"

func MarketPriceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	symbol := r.URL.Query().Get("symbol")
	if symbol == "" {
		http.Error(w, "symbol is required", http.StatusBadRequest)
		return
	}

	// DO NOT modify symbol → user must send correct format
	// e.g., AAPL, TSLA, ^NSEI, BINANCE:BTCUSDT
	url := fmt.Sprintf(
		"https://finnhub.io/api/v1/quote?symbol=%s&token=%s",
		symbol,
		FinnhubAPIKey,
	)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "could not reach Finnhub", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)

	json.NewEncoder(w).Encode(result)
}
