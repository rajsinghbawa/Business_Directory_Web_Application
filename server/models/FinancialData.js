const mongoose = require("mongoose");

const financialSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  revenueHistory: [{
    year: Number,
    revenue: Number
  }],
  CAGR: Number,
  profitMargin: Number,
  ROI: Number,
  customerRetentionRate: Number
}, { timestamps: true });

module.exports = mongoose.model("FinancialData", financialSchema);
