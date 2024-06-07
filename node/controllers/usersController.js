const query = require('../db');

const usersController = (req, res) => {
    const { id } = req.query;
    const sql = 'select * from users where user_id != ? ;';
    try {
        query(sql, [id], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '查询失败'
                })
            }
            let newData = [];
            data.forEach(item => {
                if (item.user_identity) {
                    newData.push({
                        id: item.user_id,
                        name: item.realname,
                        username: item.user_name,
                        site: item.site,
                        role: '用户',
                        phone: item.user_phone,
                        isBlack: item.isBlack
                    })
                } else {
                    newData.push({
                        id: item.user_id,
                        name: item.realname,
                        username: item.user_name,
                        role: '管理员',
                        phone: item.user_phone,
                        sex: item.sex ? '男' : '女',
                        isBlack: item.isBlack
                    })
                }
            });
            return res.json({
                code: 200,
                msg: '查询成功',
                data: newData
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = usersController;