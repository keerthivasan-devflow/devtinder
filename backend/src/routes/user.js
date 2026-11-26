const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { ConnectionRequest } = require("../models/connection");
const { userAuth } = require("../middlewares/userAuth");

const USER_SAFE_DATA = "firstname lastname -_id";

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find(
      {
        toUserId: loggedInUser._id,
        status: {
          $in: ["interested", "accepted", "ignored"],
        },
      },
      "fromUserId toUserId -_id"
    ).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    res.json({
      data: connectionRequest.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      }),
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// To get all the user's data after registration
router.get("/user/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;
