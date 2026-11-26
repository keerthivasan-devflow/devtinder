const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // "User" must be equal to the model name of "User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} is not a valid connection request status",
      },
    },
  },
  { timestamps: true },
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// This pre-save middleware runs automatically before a document is saved.
// Validation at the schema level is optional; it can also be handled at the API level.
connectionRequestSchema.pre("save", function (next) {
  const user = this;
  if (user.fromUserId.equals(user.toUserId))
    throw new Error("cannot send a connection request to yourself");

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = { ConnectionRequest };
