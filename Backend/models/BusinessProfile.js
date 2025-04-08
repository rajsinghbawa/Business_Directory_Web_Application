const mongoose = require('mongoose');

const businessProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // one profile per business
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  businessName: { type: String, required: true },
  incorporationType: { type: String },
  description: { type: String },
  contactInfo: {
    email: String,
    phone: String,
    website: String,
    address: String,
  },
  offerings: [String] // Products or services
}, { timestamps: true });

module.exports = mongoose.model('BusinessProfile', businessProfileSchema);
