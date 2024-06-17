const query = require('../db');

const searchController = (req, res) => {
    const { book_name, index, count } = req.query;
    const likeSql = `%${book_name}%`;
    /* 查询数据库，获取购物车数据 */
    let sql = 'call search(?) ;';
    query(sql, [likeSql, Number(index), Number(count)], (err, data) => {
        if (err || data.length === 0) {
            console.log(err);
            return res.json({
                code: 501,
                msg: '查询失败',
                data: null
            })
        }
        res.json({
            code: 200,
            msg: '查询成功',
            data: data[0]
        });
    });
}

module.exports = searchController;