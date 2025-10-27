# 🧠 Tradbot – Local Development Setup

This guide helps you set up the **Tradbot** project locally.  
It uses **React (frontend)**, **Go (backend)**, and **PostgreSQL (database)**.

---

## 🧩 1. Prerequisites

### macOS Dependencies
Install **Homebrew** (package manager for macOS):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install all required tools:

```bash
brew install go node postgresql git
```

Check installations:

```bash
go version
node -v
psql --version
git --version
```

---

## 🗂️ 2. Project Structure

Your repo should look like this:

```
Tradbot/
├── backend/          # Go backend API
├── frontend/         # React frontend app
├── SETUP.md          # Setup instructions (this file)
└── requirements.txt  # Dependency list for collaborators
```

---

## 🧠 3. Database Setup (PostgreSQL)

### Start PostgreSQL
```bash
brew services start postgresql
```

### Create database and user
```bash
createuser -s postgres || true   # skip if user exists
createdb -U postgres trading
```

### Test connection
```bash
psql -U postgres trading
```

If successful, you’ll see:
```
trading=#
```

Exit:
```
\q
```

---

## ⚙️ 4. Backend Setup (Go)

### Move to backend folder
```bash
cd backend
```

### Initialize Go module
```bash
go mod init github.com/Tradbot-ai/Tradbot/backend
```

### Install Fiber web framework
```bash
go get github.com/gofiber/fiber/v2
```

### Create main file
```bash
touch main.go
```

Paste the following:

```go
package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Hello from Tradbot backend 🚀"})
	})
	app.Listen(":8080")
}
```

### Run backend
```bash
go run main.go
```

Open in browser: [http://localhost:8080](http://localhost:8080)

You should see:
```json
{"message":"Hello from Tradbot backend 🚀"}
```

---

## 🌐 5. Frontend Setup (React)

### From project root:
```bash
cd frontend
npx create-react-app ./
```

Run development server:
```bash
npm start
```

Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 🔗 6. Connecting Frontend & Backend

Add a proxy in your React app’s `package.json`:
```json
"proxy": "http://localhost:8080"
```

Now API calls like:
```js
fetch("/api/hello")
```
will automatically route to your Go server.

---

## ⚙️ 7. Environment Variables

Create `.env` file inside `backend/`:

```bash
touch .env
```

Example `.env` content:
```
DB_USER=postgres
DB_PASSWORD=
DB_NAME=trading
DB_HOST=localhost
DB_PORT=5432
PORT=8080
```

You’ll later use these in Go via:
```go
import "os"
os.Getenv("DB_USER")
```

---

## 🧾 8. requirements.txt

For collaborators, the minimal dependency file:

```
go
node
postgresql
git
```

They can install everything with:
```bash
brew install $(cat requirements.txt)
```

---

## 🚀 9. Quick Start Summary

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Tradbot-ai/Tradbot.git
cd Tradbot

# 2️⃣ Install dependencies
brew install $(cat requirements.txt)

# 3️⃣ Setup database
brew services start postgresql
createuser -s postgres || true
createdb -U postgres trading

# 4️⃣ Start backend
cd backend
go run main.go

# 5️⃣ Start frontend
cd ../frontend
npm start
```

---

🎯 **You’re all set!**  
Your team can now develop and run the full-stack trading app locally —  
trading virtually with live market data (future steps will add APIs for that).
