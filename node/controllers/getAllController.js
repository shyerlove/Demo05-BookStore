const query = require('../db');

const getAllController = (req, res) => {
    /* 定义查询语句 */
    const sql = 'select count(bookdata.book_id) "count", sum(book_inventory) "inventory" from bookdata ;';
    query(sql, [], (err, data) => {
        if (err) {
            return res.json({
                code: 501,
                msg: '查询失败'
            })
        }
        res.json({
            code: 200,
            msg: '查询成功',
            data
        })
    })
}

module.exports = getAllController;