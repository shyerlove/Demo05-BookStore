const axios = require('axios');
const query = require('../db');

const delShopcarController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, book_id } = req.query;
    /* 定义SQL语句 */
    const sql1 = 'call del_shopcar(?,?);'
    /* 查询数据库 */
    query(sql1, [user_id, book_id], async (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 501,
                msg: '移除失败'
            });
        }
        /* 获取新的购物车数据 */
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:3002/webapi/shopcar',
            params: { id: user_id }
        })
        /* 向客户端返回新的购物车数据 */
        res.json({
            code: 200,
            msg: '从购物车移除成功',
            data: result.data
        })
    })
}

module.exports = delShopcarController;