const query = require('../db');

const shopcarController = (req, res) => {
    /* 获取id */
    let { id } = req.body;
    /* 查询数据库，获取购物车数据 */
    let sql = 'call getShopcar(?);';
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
            data: data[0]
        });
    });
}
module.exports = shopcarController;