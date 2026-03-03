// src/config/db.js

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "fitstudent",
  password: "rachit@1234_" || "your_postgres_password",
  port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error", err);
  process.exit(1);
});

module.exports = pool;