const query = require('../db');

const getSpecialController = (req, res) => {
    const sql = 'call getSpecial() ;';
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

module.exports = getSpecialController;