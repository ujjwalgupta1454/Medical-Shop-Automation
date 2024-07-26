const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
