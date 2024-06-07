const query = require('../db');
const blackList = (req, res) => {
    const { id, c } = req.query;
    const sql = 'call updateBlackList(?,?);';

    try {
        query(sql, [id, c], (err, data) => {
            if (err) {
                console.error(err);
                return res.json({
                    code: 501,
                    msg: '操作失败'
                })
            }
            res.json({
                code: 200,
                msg: '操作成功'
            })
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = blackList;