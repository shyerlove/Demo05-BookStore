const query = require('../db');

const buyBookController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, books } = req.body;

    /* 定义SQL语句 */
    try {
        books.forEach((item) => {
            // 从购物车删除
            let sql = `delete from shopcar where user_id=? and book_id = ?;`;
            query(sql, [user_id, item['book_id']], () => { });
            // 从库存中删除
            let sql1 = 'update bookdata set book_inventory = book_inventory-? where book_id=?;';
            query(sql1, [item['book_count'], item['book_id']], () => { });
            // 添加至订单
            let sql2 = 'insert into orderForm(user_id,book_id,book_count,order_state) values(?,?,?,?);';
            query(sql2, [user_id, item['book_id'], item['book_count'], 0], () => { });
        })
    } catch (error) {
        console.log(error);
    } finally {
        res.json({
            code: 200,
            msg: '支付成功'
        })
    }
}

module.exports = buyBookController;