const FinancialData = require('../models/FinancialData');

const createOrUpdateFinancials = async (req, res) => {
  try {
    const businessId = req.user.id;
    const data = req.body;

    let financial = await FinancialData.findOne({ business: businessId });

    if (financial) {
      financial = await FinancialData.findOneAndUpdate(
        { business: businessId },
        data,
        { new: true }
      );
    } else {
      financial = await FinancialData.create({ ...data, business: businessId });
    }

    res.status(200).json(financial);
  } catch (error) {
    res.status(500).json({ message: 'Error saving financial data' });
  }
};

const getFinancialsByBusiness = async (req, res) => {
  try {
    const financial = await FinancialData.findOne({ business: req.params.businessId }).populate('business', 'name');
    if (!financial) return res.status(404).json({ message: 'Data not found' });
    res.status(200).json(financial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial data' });
  }
};

module.exports = { createOrUpdateFinancials, getFinancialsByBusiness };
