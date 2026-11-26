const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; // 1. Get the authenticated user's ID from the userAuth middleware.
      const { toUserId, status } = req.params; // 2. Extract the recipient user ID and request status from route parameters.

      // 3. Reject unsupported connection request statuses.
      const ALLOWED_REQUEST_STATUSES = ["ignored", "interested"];
      if (!ALLOWED_REQUEST_STATUSES.includes(status)) {
        return res.status(400).json({
          message: "Invalid status " + status,
        });
      }

      // 4. Check for an existing connection request using the compound index defined in the schema.
      // Prevent duplicate connection requests between the same two users, regardless of who initiated the request - A → B or B → A
      const existingConnectionRequest = await User.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection already exists between these users",
        });
      }

      // 5. Ensure that connection requests can only be sent to users who exist in the database.
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found" });
      }

      // 6. Create and save a new connection request in a single step.
      const connectionRequest = await ConnectionRequest.create({
        fromUserId,
        toUserId,
        status,
      });

      res.status(201).json({
        message: "Connection request sent successfully",
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("Failed to send connection request " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user; // // 1. Get the authenticated user's ID from the userAuth middleware.
      const { status, requestId } = req.params; // 2. Extract the recipient user ID and request status from route parameters.

      // 3. Reject unsupported connection request statuses.
      const ALLOWED_REVIEW_STATUSES = ["accepted", "rejected"];
      if (!ALLOWED_REVIEW_STATUSES.includes(status)) {
        return res.status(400).json({ message: "Invalid status " + status });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: user._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "No pending connection request found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection Request " + status, data });
    } catch (err) {
      res
        .status(400)
        .send(
          "An error occurred while reviewing the connection request" +
            err.message,
        );
    }
  },
);

module.exports = requestRouter;
