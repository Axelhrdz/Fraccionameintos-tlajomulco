// server.js
require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mysql = require("mysql2/promise"); // Use promise-based version
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Backend will run on port 3000

// Use CORS middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Database connection pool (more efficient than creating new connection for each request)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Successfully connected to MySQL database!");
    connection.release(); // Release the connection immediately
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Exit if cannot connect to DB
  });

// Define your API endpoint
app.get("/api/fraccionamientos", async (req, res) => {
  try {
    const [rows, fields] = await pool.execute("SELECT * FROM fraccionamientos;"); // <<< IMPORTANT: Replace 'users_table' with your actual table name
    res.json(rows); // Send the fetched rows as JSON
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Failed to fetch users data." });
  }
});

// Basic root route for testing
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});