const query = require('../db');

const buyBookController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, book_id, count } = req.body;
    /* 定义SQL语句 */
    const sql1 = 'call buy_book(?,?,?);'
    /* 查询数据库 */
    query(sql1, [user_id, book_id, count], async (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 501,
                msg: '支付失败'
            });
        }
        const sql2 = 'select book_name,book_press,store_name from bookdata where book_id = ?';
        query(sql2, [book_id], (err, data) => {
            if (err) {
                return;
            }
            res.json({
                code: 200,
                msg: '支付成功',
                data: {
                    data,
                    count
                }
            })
        });
    })
}

module.exports = buyBookController;