const express = require("express")
const cors = require("cors")

const uploadRoutes = require("./routes/uploadRoutes")

const app = express()

// ---------- Middleware ----------
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json({ limit: "2gb" }))
app.use(express.urlencoded({ extended: true, limit: "2gb" }))

// ---------- Routes ----------
app.use("/api/upload", uploadRoutes)

app.get("/", (req, res) => {
  res.send("MxS-AI Backend Running")
})

// ---------- Error handler ----------
app.use((err, req, res, next) => {
  console.error("Server error:", err)
  res.status(500).json({ error: "Internal server error" })
})

// ---------- Start server ----------
const PORT = 8000

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// disable timeout for large uploads
server.timeout = 0