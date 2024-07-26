const Sale = require('../models/Sales');

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSale = async (req, res) => {
  const { date, invoiceNo, customerName, items, valueOfGoods, totalDiscount, totalGST, invoiceValue } = req.body;
  const newSale = new Sale({
    date,
    invoiceNo,
    customerName,
    items,
    valueOfGoods,
    totalDiscount,
    totalGST,
    invoiceValue
  });

  try {
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a sale by ID
exports.updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
