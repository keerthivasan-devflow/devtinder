const express = require("express");
const { IS_VALID_PASSWORD, ENCRYPT_PASSWORD, VALIDATE_SIGNUP } = require("../utils/validations");
const { User } = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { password } = req.body;

  try {
    // 1. Validation - API-Level or Schema-Level
    VALIDATE_SIGNUP(req);

    // 2. Encrypting Passwords
    const HASHED_PASSWORD = await ENCRYPT_PASSWORD(password);

    // 3. Create an instance of a model "User"
    const user = new User({
      ...req.body,
      password: HASHED_PASSWORD,
    });

    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res
      .status(400)
      .send(`Error occurred while registering user: ${err.message}`);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No account found with this email");

    let isValid = await IS_VALID_PASSWORD(password, user.password);

    if (isValid) {
      // 1. Generate a JWT Token
      const token = await user.generateJWT();

      // 2. Add the generated token to a cookie and include it in the response sent back to the user.
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send(`Login failed: ${err.message}`);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful!");
});

module.exports = authRouter;
