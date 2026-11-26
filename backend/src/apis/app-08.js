// Example 8: API-Level Validation - Check app.patch("/user")

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

app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const data = req.body;
  try {
    const ALLOWED_FIELDS = ["firstname", "lastname", "age", "phone", "skills"];

    const isValidUpdate = Object.keys(data).every((field) =>
      ALLOWED_FIELDS.includes(field),
    );

    if (!isValidUpdate)
      throw new Error("Invalid update: This field is not permitted.");

    if (data?.skills.length > 3)
      throw new Error("Skill limit exceeded: maximum of 3 allowed");

    if (new Set(data?.skills).size !== data?.skills.length)
      throw new Error("Duplicate skills are not allowed");

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send(`Error occurred while updating user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
