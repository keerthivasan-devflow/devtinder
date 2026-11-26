// Example 2: Pass dynamic data through postman to database

const express = require("express");
const connectDB = require("../config/database.js");
const { User } = require("../models/user.js");

const app = express();
const PORT = 8083;

app.use(express.json()); // This middleware runs on all routes, so we attach it with app.use().

app.post("/signup", async (req, res) => {
  // Important Note: You'll get "undefined" because Express can't read raw JSON directly.
  // We need the express.json() middleware to parse incoming JSON into a usable format.
  // console.log(req.body);

  const data = req.body;

  try {
    const user = new User(data);
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res
      .status(400)
      .send(`Error occurred while registering user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
