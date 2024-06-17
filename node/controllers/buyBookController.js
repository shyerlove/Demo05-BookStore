const query = require('../db');

const buyBookController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, books } = req.body;

    /* 定义SQL语句 */
    const sql = 'call buy_book(?,?,?,?,?)';

    try {
        /* 连接数据库 */
        books.forEach(b => {
            query(sql, [b.shopCar_id, b.store_id, b.book_id, user_id, b.book_count], (err, data) => {
                if (err) { throw err; }
            });
        })
        res.json({
            code: 200,
            type: 'success',
            msg: '购买成功'
        });
    } catch (error) {
        res.json({
            code: 500,
            type: 'error',
            msg: '购买失败'
        })
    }
}

module.exports = buyBookController;