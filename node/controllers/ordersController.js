const query = require('../db');

const ordersController = (req, res) => {
    /* 获取用户id */
    const { user_id } = req.query;
    const sql = 'call get_userorders(?);'
    query(sql, [user_id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '获取订单失败',
                type: 'error',
            })
        }
        res.json({
            code: 200,
            msg: '获取订单成功',
            type: 'success',
            data: data[0]
        })
    })
}

module.exports = ordersController;