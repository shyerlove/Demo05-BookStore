const query = require('../db');

const addShopcarController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, book_id, count } = req.query;
    /* 定义SQL语句 */
    const sql = 'call update_shopcar(?,?,?);'
    /* 连接数据库 */
    query(sql, [user_id, book_id, count], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 501,
                msg: '加入购物车失败'
            });
        }
        res.json({
            code: 200,
            msg: '加入购物车成功'
        })
    })
}

module.exports = addShopcarController;