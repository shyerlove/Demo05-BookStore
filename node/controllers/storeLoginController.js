const query = require('../db');
const JWT = require('../utils/jwt');

const storeLoginController = (req, res) => {
    const { store_name, store_password } = req.query;
    console.log(store_name, store_password);
    let sql = `select * from stores where store_name = ? and store_password = ?`;
    query(sql, [store_name, store_password], (err, data) => {
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
                id: data[0].store_id,
                store_name: data[0].store_name,
                store_phone: data[0].store_phone,
                store_site: data[0].store_site,
                property: data[0].property,
                token
            }
        });
    })
}

module.exports = storeLoginController;