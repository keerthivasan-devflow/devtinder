// Example 5: Delete a record from database

const express = require("express");
const connectDB = require("../config/database.js");
const { User } = require("../models/user.js");

const app = express();
const PORT = 8083;

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.find({ email });
    res.send(user);
  } catch (err) {
    res
      .status(400)
      .send(`Error occurred while receiving user details: ${err.message}`);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res
      .status(400)
      .send(`Error occurred while receiving users details: ${err.message}`);
  }
});

app.delete("/user", async (req, res) => {
  // The "id" here must match the one you send in postman.
  const userId = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res
      .status(400)
      .send(`Error occurred while deleting a user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
