const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { User } = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("Error occured: while reading user data");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  // const userId = req.body.id;
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

    const user = await User.findByIdAndUpdate(req.user._id, data, {
      new: "after", // before it is "returnDocument"
      runValidators: true,
    });

    res.send(user.firstname + " profile updated successfully");
  } catch (err) {
    res.status(400).send(`Error occurred while updating user: ${err.message}`);
  }
});

module.exports = profileRouter;
