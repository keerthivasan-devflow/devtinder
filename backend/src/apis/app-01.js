const express = require("express");
const connectDB = require("../config/database.js");
const { User } = require("../models/user.js");

const app = express();
const PORT = 8083;

app.post("/signup", async (req, res) => {
  const member = {
    firstname: "Michael",
    lastname: "Smith",
    email: "michael.smith@example.com",
    phone: 8872131420,
    password: "Michael@123",
    age: 30,
    gender: "male",
  };

  try {
    const user = new User(member); // This creates a new instance of a model "User"
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res
      .status(400) // It signals a client-side error like validation failure.
      .send(`Error occurred while registering user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
