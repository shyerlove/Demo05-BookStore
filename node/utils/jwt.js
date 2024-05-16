// 导入jwt模块
const jwt = require('jsonwebtoken');
const config = 'shyerlove'; // 密钥

const JWT = {
    createJWT: (data, day) => {
        /* 生成token */
        return jwt.sign({
            username: data.user_name,
            password: data.user_password
        }, config, {
            expiresIn: 60 * 60 * 24 * day,
        });
    },
    verifyJWT: (token) => {
        try {
            /* 验证token */
            return jwt.verify(token, config);
        } catch (err) {
            console.log('无效token');
        }
    }
}

module.exports = JWT;