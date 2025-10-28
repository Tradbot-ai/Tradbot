package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

// simple handler for GET /api/hello
func helloHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    response := map[string]string{"message": "Hello from Go backend 👋"}
    json.NewEncoder(w).Encode(response)
}

func main() {
    // register the route
    http.HandleFunc("/api/hello", helloHandler)

    fmt.Println("✅ Go backend running at http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
