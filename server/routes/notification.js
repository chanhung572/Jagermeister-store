const express = require('express');
const router = express.Router();
const ActionLog = require('../models/actionlog');

router.get('/', async (req, res) => {
  try {
    const logs = await ActionLog.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông báo', error: err });
  }
});

module.exports = router;