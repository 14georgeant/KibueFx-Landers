
const express = require("express");
const pool = require("./db");
const sendSignupNotification = require("./mailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ message: "Missing fields" });

  try {
    await pool.query(
      "INSERT INTO signups (name, email, created_at) VALUES ($1, $2, NOW())",
      [name, email]
    );

    await sendSignupNotification(name, email);

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => res.send("KibueFx API is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
