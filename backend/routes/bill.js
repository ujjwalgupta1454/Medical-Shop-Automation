// backend/routes/bill.js

const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const Inventory = require('../models/Inventory');

router.post('/', async (req, res) => {
  try {
    const { date, billNo, partyName, products, totalDiscount, totalCGST, totalSGST, finalAmount } = req.body;
    
    // Save bill
    const newBill = new Bill({ date, billNo, partyName, products, totalDiscount, totalCGST, totalSGST, finalAmount });
    await newBill.save();

    // Update inventory
    for (const product of products) {
      const { productName, batchNo, expiryDate, quantity, rate, discount, cgst, sgst, mrp, amount } = product;
      const inventoryItem = await Inventory.findOne({ productName });
      if (inventoryItem) {
        inventoryItem.stockAvailable += quantity;
        await inventoryItem.save();
      } else {
        const newInventoryItem = new Inventory({
          productName,
          batchNo,
          expiryDate,
          stockAvailable: quantity,
          rate,
          mrp,
        });
        await newInventoryItem.save();
      }
    }

    res.status(201).send('Bill saved successfully');
  } catch (error) {
    console.error('Error saving bill:', error);
    res.status(500).send('Error saving bill');
  }
});

module.exports = router;
