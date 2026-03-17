# 📋 Record Manager

> A full-stack technical assessment demonstrating core web development fundamentals — built entirely from scratch, with zero external dependencies.

---

## 🧱 Architecture Notes

### Backend — Singleton Repository Pattern

The C# Minimal API uses a single `RecordRepository` class registered as a **Singleton** in the .NET dependency injection container. This means one instance is shared across all HTTP requests for the lifetime of the application, simulating a persistent data store entirely in-memory.

### Frontend — Component & State Structure

State is managed using React's built-in `useState` and `useEffect` hooks. The application follows a unidirectional data flow: the top-level `App` component owns the record list state and passes data and callbacks down to child components via props.

---

## ✅ Prerequisites

Choose your preferred run method below and ensure the corresponding tools are installed.

| Method                        | Requirements                                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| 🐳 **Docker** _(Recommended)_ | [Docker Desktop](https://www.docker.com/products/docker-desktop/)                                      |
| 💻 **Local / Manual**         | [Node.js v18+](https://nodejs.org/) and [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) |

---

## 🚀 Running the Application

### Option 1 — Docker _(Recommended)_

This is the fastest and most reliable way to run the application. Docker handles all dependencies and wiring automatically.

**1. Clone the repository and navigate to the root directory:**

```bash
git clone <your-repo-url>
cd <repo-name>
```

**2. Build and start all services with a single command:**

```bash
docker-compose up --build
```

**3. Open your browser:**

| Service                 | URL                                                                          |
| ----------------------- | ---------------------------------------------------------------------------- |
| 🌐 Frontend (React App) | [http://localhost:3000](http://localhost:3000)                               |
| ⚙️ Backend API          | [http://localhost:5000/api/v1/records](http://localhost:5000/api/v1/records) |

> To stop the application, press `Ctrl + C` in the terminal, then run `docker-compose down`.

---

### Option 2 — Local / Manual Setup

This method requires **two separate terminal windows** running concurrently.

#### Terminal 1 — Start the Backend

```bash
# Navigate to the server directory
cd Server

# Start the .NET API (listens on http://localhost:5000)
dotnet run
```

You should see output confirming the API is listening on port `5000`.

#### Terminal 2 — Start the Frontend

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The React app will be available at **[http://localhost:5173](http://localhost:5173)** (Vite's default port).

> ⚠️ **Note:** Both the backend and frontend must be running simultaneously for the application to function correctly.

---

## 📁 Project Structure

```
/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components (List, Detail, Toast, Spinner, etc.)
│   │   ├── App.jsx          # Root component — owns global state
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── package.json
│   └── Dockerfile           # Docker build for the React app
│
├── Server/                  # C# .NET 8 Minimal API
│   ├── Repositories/        # RecordRepository (Singleton, in-memory)
│   ├── Models/              # Record data model
│   ├── Program.cs           # API entry point & route definitions
│   ├── Server.csproj
│   └── Dockerfile           # Docker build for the .NET API
│
├── docker-compose.yml       # Orchestrates frontend + backend containers
└── README.md
```

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| `GET`  | `/records`      | Retrieve all records      |
| `PUT`  | `/records/{id}` | Update an existing record |

> The API returns JSON. An intentional 800ms delay is applied on `PUT` requests to simulate realistic network latency for UI testing purposes.

---

_Built with ☕ and zero external dependencies._
