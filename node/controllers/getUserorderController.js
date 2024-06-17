const query = require('../db');

const getUserorderController = (req, res) => {
    // 获取商家id
    const { store_id } = req.body;
    // 定义查询语句
    const sql = 'call get_userorder(?) ;';
    try {
        query(sql, [store_id], (err, data) => {
            if (err) throw err;
            res.json({
                code: 200,
                msg: '获取数据成功',
                type: 'success',
                data: data[0]
            })
        })
    } catch (error) {
        console.log(error);
        res.json({
            code: 501,
            msg: '获取失败',
            type: 'error'
        })
    }
}

module.exports = getUserorderController;