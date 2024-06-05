const query = require('../db');


const forgetController = (req, res) => {
    const { userName, password, phone } = req.body;
    const sql = 'update users set user_name =? , user_password =? where user_phone =?';
    query(sql, [userName, password, phone], (err, data) => {
        if (err) {
            return res.json({
                code: 500,
                msg: '没有此用户',
            })
        }
        res.json({
            code: 200,
            msg: '修改成功',
        })
    })
}

module.exports = forgetController;