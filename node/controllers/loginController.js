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
        if (data[0].isBlack === 0) {
            return res.json({
                code: 403,
                msg: '您的账号已被冻结，申诉邮箱:2479617194@qq.com',
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
                ...data[0],
                id: data[0].user_id,
                username: data[0].user_name,
                role: data[0].user_identity,
                token
            }
        });
    });
}

module.exports = loginController;