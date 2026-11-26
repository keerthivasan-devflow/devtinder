// Example 11: Cookies Introduction

const express = require("express");
const connectDB = require("../config/database.js");
const { User } = require("../models/user.js");
const { IS_VALID_PASSWORD } = require("../utils/validations.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8083;

app.use(express.json());
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No account found with this email");

    let isValid = await IS_VALID_PASSWORD(password, user.password);

    if (isValid) {
      // 1. Generate a JWT Token
      const token = "KFOM8131N";

      // 2. Add the generated token to a cookie and include it in the response sent back to the user.
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send(`Login failed: ${err.message}`);
  }
});

// This section is included solely for testing, to verify whether a cookie can be retrieved or not.
app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  console.log(token);
  res.send("Reading a cookie info...");
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
