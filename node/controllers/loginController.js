const query = require('../db');
const JWT = require('../utils/jwt');

const loginController = (req, res) => {
    const { username, password } = req.query;
    let sql = `select * from users where user_name = ? and user_password = ?`;
    query(sql, [username, password], (err, data) => {
        if (err || !data.length) {
            return res.json({
                code: 500,
                msg: '账号或密码错误',
                type: 'error',
                data: null
            });
        }
        /* 生成token */
        let token = JWT.createJWT(data, 7);

        res.json({
            code: 200,
            msg: '登录成功',
            type: 'success',
            data: {
                id: data[0].user_id,
                realname: data[0].realname,
                username: data[0].user_name,
                phone: data[0].user_phone,
                role: data[0].user_identity,
                token
            }
        });
    });
}

module.exports = loginController;