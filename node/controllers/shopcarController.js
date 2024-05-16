const query = require('../db');

const shopcarController = (req, res) => {
    /* 获取id */
    let { id } = req.query;
    /* 查询数据库，获取购物车数据 */
    let sql = `select * from books.bookdata,books.shopcar where books.bookdata.book_id = books.shopcar.book_id and books.shopcar.user_id = ?`;
    query(sql, [id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '获取失败',
                data: null
            })
        }
        res.json({
            code: 200,
            msg: '获取购物车数据成功',
            data
        });
    });
}
module.exports = shopcarController;