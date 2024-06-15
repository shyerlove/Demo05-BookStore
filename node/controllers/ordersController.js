const query = require('../db');

const ordersController = (req, res) => {
    /* 获取用户id */
    const { user_id } = req.query;
    const sql = 'select orderForm.book_id,bookdata.book_name, bookdata.book_imgUrl,orderForm.book_count, bookdata.store_name,orderForm.order_state from bookdata,orderForm where bookdata.book_id = orderForm.book_id and orderForm.user_id = ? ;'
    query(sql, [user_id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '获取订单失败'
            })
        }
        res.json({
            code: 200,
            msg: '获取订单成功',
            data
        })
    })
}

module.exports = ordersController;