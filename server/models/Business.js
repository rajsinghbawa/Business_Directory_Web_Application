const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  incorporationType: { type: String, required: true }, // e.g., Private, Corporation
  description: String,
  contactDetails: String,
  industry: String,
  location: String,
  role: { type: String, default: "business" }
}, { timestamps: true });

module.exports = mongoose.model("Business", businessSchema);
