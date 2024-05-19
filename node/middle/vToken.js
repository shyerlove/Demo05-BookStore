const JWT = require('../utils/jwt');

/* 每次发送请求时，校验token */
const vToken = (req, res, next) => {
    /* 登录时不用校验 */
    if (req.path === '/webapi/login' || req.path === '/webapi/sign' || req.path === '/img') {
        next();
        return;
    }
    /* 获取token */
    const token = req.headers["token"];
    if (token) {
        const payload = JWT.verifyJWT(token);
        if (payload) {
            /* 校验通过，刷新token */
            const newToken = JWT.createJWT({
                username: payload.username,
                password: payload.password
            }, 7);
            /* 响应给客户端 */
            res.header("token", newToken);
            /* 校验通过 */
            next();
            return;
        } else {
            /* 校验不通过 */
            return res.json({
                code: '401',
                error: 'token过期',
            });
        }
    } else {
        return res.json({
            code: '401',
            error: '缺少token',
        });
    }
}
module.exports = vToken;