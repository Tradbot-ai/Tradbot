package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Tradbot-ai/Tradbot/backend/database"
	"github.com/Tradbot-ai/Tradbot/backend/routes"
)

func main() {
	// Initialize DB
	database.InitDB()

	// Root dashboard
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		html := `
		<html>
			<head>
				<title>Tradbot Backend</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						background-color: #0d1117;
						color: #e6edf3;
						text-align: center;
						padding: 40px;
					}
					h1 {
						color: #58a6ff;
					}
					.box {
						padding: 20px;
						background-color: #161b22;
						border-radius: 10px;
						width: 400px;
						margin: 20px auto;
						box-shadow: 0 0 10px rgba(255,255,255,0.1);
					}
					a {
						color: #58a6ff;
						text-decoration: none;
						font-size: 18px;
					}
					a:hover {
						text-decoration: underline;
					}
				</style>
			</head>
			<body>
				<h1>🚀 Tradbot Backend Running</h1>
				<div class="box">
					<p>Your Go server is live!</p>
					<h3>API Endpoints:</h3>
					<p><a href="/api/hello">/api/hello</a></p>
					<p><a href="/api/time">/api/time</a></p>
					<p><a href="/api/trades">/api/trades</a></p>
					<p style="margin-top:20px; font-size:14px; opacity:0.7;">
						React frontend runs on <b>http://localhost:3000</b>
					</p>
				</div>
			</body>
		</html>
		`
		w.Write([]byte(html))
	})

	// API routes
	http.HandleFunc("/api/hello", routes.HelloHandler)
	http.HandleFunc("/api/time", routes.TimeHandler)
	http.HandleFunc("/api/trades", routes.TradesHandler)

	// Start server
	fmt.Println("🚀 Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
