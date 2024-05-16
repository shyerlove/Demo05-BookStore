const query = require('../db');

const searchController = (req, res) => {
    const { book_name } = req.query;

    /* 查询数据库，获取购物车数据 */
    let sql = 'select * from bookData where book_name = ?';
    query(sql, [book_name], (err, data) => {
        if (err || !data.length) {
            return res.json({
                code: 500,
                msg: '查询失败',
                data: null
            });
        }

        res.json({
            code: 200,
            msg: '查询成功',
            data
        });
    });
}

module.exports = searchController;