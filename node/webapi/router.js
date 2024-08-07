const express = require('express');
const multer = require('multer');

const signController = require('../controllers/signController');
const storeLoginController = require('../controllers/storeLoginController');
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
const addBookController = require('../controllers/addBookController');
const delsShopcarController = require('../controllers/delsShopcarController');
const forgetController = require('../controllers/forgetController');
const ordersController = require('../controllers/ordersController');
const getMenusController = require('../controllers/getMenusController');
const usersController = require('../controllers/usersController');
const blackListController = require('../controllers/blackListController');
const adminController = require('../controllers/adminController');
const inventoryController = require('../controllers/inventoryController');
const getBookClassController = require('../controllers/getBookClassController');
const stockOrderController = require('../controllers/stockOrderController');
const getStockStateController = require('../controllers/getStockStateController');
const getUserorderController = require('../controllers/getUserorderController');
const delUserorderController = require('../controllers/delUserorderController');
const uploadHeadController = require('../controllers/uploadHeadController');
/* 创建路由对象 */
const router = express.Router();
const upload = multer();

// 注册
router.post('/sign', signController);
// 用户登录
router.post('/login', loginController);
// 商家登录
router.post('/storeLogin', storeLoginController);
// 添加至购物车
router.post('/addShopcar', addShopcarController);
// 分页获取图书信息
router.post('/books', booksController);
// 获取全部图书信息
router.get('/books', booksController);
// 支付
router.post('/buyBook', buyBookController);
// 从购物车移除
router.post('/delShopcar', delShopcarController);
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
// 新增图书
router.post('/addBook', upload.any(), addBookController);
// 修改图书信息
router.post('/updateBook', upload.any(), updateBookController);
// 批量删除购物车
router.post('/delsShopcar', delsShopcarController);
// 找回密码
router.post('/forget', forgetController);
// 获取用户订单
router.get('/orders', ordersController);
// 获取路由菜单
router.get('/menus', getMenusController);
// 获取全部用户信息
router.get('/users', usersController);
// 加入/移除 黑名单
router.get('/blackList', blackListController);
// 删除管理员
router.get('/admin', adminController);
// 获取商家库存
router.get('/inventory', inventoryController);
// 获取类别及数量
router.get('/bookclass', getBookClassController);
// 入库
router.post('/stackorder', stockOrderController);
// 获取商家订单状态
router.get('/stackorder', getStockStateController);
// 获取用户订单
router.get('/userorder', getUserorderController);
// 删除用户订单
router.post('/userorder', delUserorderController);
// 上传头像
router.post('/headimg', upload.any(), uploadHeadController);
/* 导出路由 */
module.exports = router;