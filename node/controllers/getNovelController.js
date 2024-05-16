const query = require('../db');

const getNovelController = (req, res) => {
    const sql = 'select * from bookData where store_name = "新时代书店" limit 0,5';
    query(sql, [], (err, data) => {
        if (err) {
            return res.json({
                code: 501,
                msg: '获取失败'
            });
        }
        res.json({
            code: 200,
            msg: '获取成功',
            data
        })
    })
}

module.exports = getNovelController;