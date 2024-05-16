const express = require('express');

const addShopcarController = require('../controllers/addShopcarController');
const booksController = require('../controllers/booksController');
const buyBookController = require('../controllers/buyBookController');
const delShopcarController = require('../controllers/delShopcarController');
const loginController = require('../controllers/loginController');
const searchController = require('../controllers/searchController');
const shopcarController = require('../controllers/shopcarController');
const getTopController = require('../controllers/getTopController');
const getSpecialController = require('../controllers/getSpecialController');
const getNovelController = require('../controllers/getNovelController');
const getAllController = require('../controllers/getAllController');
const updateBookController = require('../controllers/updateBookController');
/* 创建路由对象 */
const router = express.Router();

// 添加至购物车
router.post('/addShopcar', addShopcarController);
// 分页获取图书信息
router.post('/books', booksController);
// 支付
router.post('/buyBook', buyBookController);
// 从购物车移除
router.post('/delShopcar', delShopcarController);
// 登录
router.post('/login', loginController);
// 搜索
router.get('/search', searchController);
// 获取购物车信息
router.post('/shopcar', shopcarController);
// 获取top5图书
router.get('/getTop', getTopController);
// 获取特价图书
router.get('/getSpecial', getSpecialController);
// 获取小说榜
router.get('/getNovel', getNovelController);
// 获取图书总信息
router.get('/getAll', getAllController);
// 修改图书信息
router.post('/updateBook', updateBookController);


/* 导出路由 */
module.exports = router;