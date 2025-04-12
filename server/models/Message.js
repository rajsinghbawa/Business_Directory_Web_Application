// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, refPath: "senderModel", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, refPath: "receiverModel", required: true },
  senderModel: { type: String, enum: ["User", "Business"], required: true },
  receiverModel: { type: String, enum: ["User", "Business"], required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
