const query = require('../db');
const getQueryCount = require('../utils/getQueryCount');


const delsShopcarController = (req, res) => {
    // 获取参数
    const { user_id, ids } = req.body;
    const str = getQueryCount(ids);
    // 定义SQL语句
    const sql = `delete from shopcar where user_id=? and book_id in(${str}); `;
    // 连接数据库
    query(sql, [user_id, ...ids], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '删除失败'
            })
        }
        res.json({
            code: 200,
            msg: '删除成功'
        })
    })
}

module.exports = delsShopcarController;