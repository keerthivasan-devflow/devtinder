// Example 10: Login API along w/ password validation

const express = require("express");
const connectDB = require("../config/database.js");
const { User } = require("../models/user.js");
const { IS_VALID_PASSWORD } = require("../utils/validations.js");

const app = express();
const PORT = 8083;

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body; // Here 'email' and 'password' will be fetched in postman

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No account found with this email");

    // Using 'await' is essential because bcrypt.compare() returns a 'Promise'
    let isValid = await IS_VALID_PASSWORD(password, user.password);
    if (isValid) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send(`Login failed: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("database connection is established successfully");
    app.listen(PORT, () => console.log("server is running " + PORT));
  })
  .catch((err) => console.log("database connection failed" + err.message));
