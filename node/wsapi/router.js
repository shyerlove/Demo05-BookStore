const express = require('express');
const router = express.Router();

const stockOrderChar = require('../chars/stockOrderChar.js');
const userOrderChar = require('../chars/userOrderChar.js');

// 商家下单
router.ws('/stockorder', stockOrderChar);

// 用户下单
router.ws('/userorder', userOrderChar);

module.exports = router;