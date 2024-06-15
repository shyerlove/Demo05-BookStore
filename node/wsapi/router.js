const express = require('express');
const router = express.Router();

const stockOrderChar = require('../chars/stockOrderChar.js');

// 商家下单
router.ws('/stockorder', stockOrderChar);

module.exports = router;