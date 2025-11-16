package routes

import (
    "encoding/json"
    "net/http"
    "time"
)

func TimeHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "server_time": time.Now().Format(time.RFC1123),
    })
}
