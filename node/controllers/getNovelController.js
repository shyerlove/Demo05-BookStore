const query = require('../db');

const getNovelController = (req, res) => {
    const sql = 'call getNovel();';
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
            data: data[0]
        })
    })
}

module.exports = getNovelController;