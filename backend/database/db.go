package database

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
    connStr := "user=postgres dbname=trades sslmode=disable"

    var err error
    DB, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal("❌ Failed to connect:", err)
    }

    err = DB.Ping()
    if err != nil {
        log.Fatal("❌ Could not ping DB:", err)
    }

    fmt.Println("✅ Connected to PostgreSQL")
}
