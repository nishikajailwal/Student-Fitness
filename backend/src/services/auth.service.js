const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(name, email, password) {
  const existing = await pool.query(
    "SELECT id FROM users WHERE email=$1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role`,
    [name, email, hash]
  );

  return result.rows[0];
}

async function login(email, password) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  return token;
}

module.exports = { register, login };