const query = require('../db');

const adminController = (req, res) => {
    const { id } = req.query;
    const sql = 'delete from users where user_id = ? ;';

    query(sql, [id], (err) => {
        console.log(err);
        if (err) {
            return res.json({
                code: 501,
                msg: '删除失败'
            })
        }
        res.json({
            code: 200,
            msg: '删除成功'
        })
    })
}

module.exports = adminController;