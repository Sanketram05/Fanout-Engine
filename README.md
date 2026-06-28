# ⚽ FanOut-Engine - Real-Time Football Match Tracker

A full-stack real-time football tracking application built with **Next.js**, **Express.js**, **PostgreSQL**, **Drizzle ORM**, and **WebSockets**. The application fetches live football match data from the API-Football service, synchronizes it with a PostgreSQL database, and streams live commentary updates to connected clients.

---

## 📸 Features

### ⚽ Live Match Tracking

* View live football matches
* Live scores and match status
* Search matches by team name
* Filter matches by status

  * Live
  * Scheduled
  * Finished

### 📝 Match Commentary

* Detailed match commentary timeline
* Goal, card, substitution and match events
* Chronological event ordering
* Empty state handling

### ⚡ Real-Time Updates

* WebSocket powered live commentary
* Match specific subscriptions
* Automatic broadcasting of newly inserted commentary
* Duplicate event prevention

### 🛡 Backend Features

* Express REST API
* PostgreSQL database
* Drizzle ORM
* Automatic match synchronization
* Automatic commentary synchronization
* API rate-limit handling
* Request timeout handling
* Duplicate prevention using atomic database operations
* Secure WebSocket server with Arcjet protection

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Query
* WebSockets

## Backend

* Node.js
* Express.js
* PostgreSQL
* Drizzle ORM
* WebSocket (ws)
* API-Football API
* Arcjet

---

# 📂 Project Structure

```
sportz/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
│
├── src/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── validation/
│   ├── ws/
│   └── index.js
│
├── drizzle/
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/sportz.git

cd sportz
```

---

## Install Backend

```bash
npm install
```

---

## Install Frontend

```bash
cd frontend

npm install
```

---

# 🔑 Environment Variables

Backend `.env`

```env
DATABASE_URL=

FOOTBALL_API_URL=

FOOTBALL_API_KEY=

HOST=0.0.0.0

PORT=8000
```

Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

---

# 🗄 Database

Generate migration

```bash
npx drizzle-kit generate
```

Apply migration

```bash
npx drizzle-kit migrate
```

---

# ▶️ Running the Project

## Backend

```bash
npm run dev
```

Runs on

```
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm run dev
```

Runs on

```
http://localhost:3000
```

---

# 📡 API Endpoints

## Matches

```
GET /matches
```

Returns all matches.

---

```
GET /matches/:id
```

Returns a single match.

---

## Commentary

```
GET /matches/:id/commentary
```

Returns commentary for a match.

---

# 🔄 Real-Time Flow

```
Football API
      │
      ▼
Backend Sync
      │
      ▼
PostgreSQL
      │
      ▼
WebSocket Broadcast
      │
      ▼
Next.js Client
```

---

# 🚀 Future Improvements

* Team logos (requires higher API tier)
* League logos
* Live score animations
* Match statistics
* Player statistics
* Notifications
* Authentication
* Deployment


---

# 👨‍💻 Author

**Sanket Ram**

GitHub: https://github.com/SanketRam05

---

# 📄 License

This project is developed for educational and learning purposes.
