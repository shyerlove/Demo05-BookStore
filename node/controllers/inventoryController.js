const query = require('../db');

const inventoryController = (req, res) => {
    const { user_id, } = req.query;
    const sql = 'select bookdata.book_id,msg,book_name,book_class,book_press,book_price,book_count from storebookdata,bookdata where store_id = ? and storebookdata.book_id = bookdata.book_id ;';
    try {
        query(sql, [user_id], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '查询失败'
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
    }
}

module.exports = inventoryController;