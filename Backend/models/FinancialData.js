const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  revenueHistory: [{
    year: Number,
    revenue: Number
  }],
  CAGR: Number,
  profitMargin: Number,
  ROI: Number,
  customerRetentionRate: Number
}, { timestamps: true });

module.exports = mongoose.model('FinancialData', financialDataSchema);
