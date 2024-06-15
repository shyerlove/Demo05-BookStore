const query = require('../db');

const getMenusController = (req, res) => {
    const { role } = req.query;

    const sql = 'select * from menus where user_role = ? order by case when menu_name = "个人中心" then 1 else 0 end;';

    try {
        query(sql, [role], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '查询失败',
                    data: null
                })
            }
            res.json({
                code: 200,
                msg: '查询成功',
                data
            })
        })
    } catch (error) {
        console.log(error);
        return res.json({
            code: 500,
            msg: '查询失败',
            data: null
        })
    }
}

module.exports = getMenusController;