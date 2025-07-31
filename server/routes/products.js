const express = require('express');
const router = express.Router();
const { addProduct, deleteProducts, updateProduct, getAllProducts } = require('../controller/productscontroller');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, addProduct);
router.post('/delete', authMiddleware, deleteProducts);
router.post('/update', authMiddleware, updateProduct);
router.get('/get', authMiddleware, getAllProducts);

module.exports = router;