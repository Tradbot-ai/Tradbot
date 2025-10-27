package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    response := map[string]string{"message": "Hello from Go backend 👋"}
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.HandleFunc("/api/hello", helloHandler)

    fmt.Println("✅ Go backend running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
