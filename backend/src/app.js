const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// ==================
// MIDDLEWARE
// ==================
app.use(cors());
app.use(helmet());
app.use(express.json());

// ==================
// ROUTES
// ==================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/profile", require("./routes/profile.routes"));
app.use("/api/weight", require("./routes/weight.routes"));
app.use("/api/plan", require("./routes/plan.routes"));
app.use("/api/chat", require("./routes/chat.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

// ==================
// HEALTH CHECK
// ==================
app.get("/", (req, res) => {
  res.json({ message: "FitStudent Backend Running 🚀" });
});

// ==================
// GLOBAL ERROR HANDLER
// ==================
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(400).json({
    error: err.message || "Something went wrong"
  });
});

module.exports = app;