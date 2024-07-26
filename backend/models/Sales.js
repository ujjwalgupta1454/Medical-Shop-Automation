const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  batchNo: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  discount: { type: Number, required: true },
  gst: { type: Number, required: true },
  mrp: { type: Number, required: true },
  amount: { type: Number, required: true },
}, { _id: false }); // Prevent creation of an additional _id field for items

const saleSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, required: true },
  invoiceNo: { type: String, required: true },
  customerName: { type: String, required: true },
  items: [itemSchema], // Use the defined item schema
  valueOfGoods: { type: Number, required: true },
  totalDiscount: { type: Number, required: true },
  totalGST: { type: Number, required: true },
  invoiceValue: { type: Number, required: true },
});

module.exports = mongoose.model('Sale', saleSchema);
