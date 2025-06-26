const mongoose = require("mongoose");
const { User } = require("../models/User");

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  connectionStatus: {
    type: String,
    enum: ["interested", "accepted", "rejected", "ignored"],
    required: true,
  },
});

const connectionModel = mongoose.model("connectionModel", connectionSchema);
module.exports = connectionModel;
