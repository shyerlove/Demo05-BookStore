const query = require('../db');

const signController = (req, res) => {
    const { realname, phone, username, sex, site, password, identity } = req.body;
    /* 查询数据库，获取购物车数据 */
    let sql = 'insert into users(realname,sex,user_phone,user_name,site,user_password,user_identity) values(?,?,?,?,?,?,?)';
    query(sql, [realname, sex, phone, username, site, password, Number(identity)], (err, data) => {
        if (err) {
            return res.json({
                code: 500,
                msg: '注册失败',
            });
        }
        // 注册成功
        res.json({
            code: 200,
            msg: '注册成功',
        });
    });
}

module.exports = signController;