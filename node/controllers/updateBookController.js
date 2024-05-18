const query = require('../db');

const updateBookController = (req, res) => {
    const {
        book_name,
        book_press,
        book_imgUrl,
        book_cost,
        book_price,
        book_inventory,
        store_name,
        book_id
    } = req.body;

    const sql = 'update bookdata set book_name=?,book_press=?,book_imgUrl=?,book_cost=?,book_price=?,book_inventory=?,store_name=? where book_id = ?;';
    query(sql, [book_name, book_press, book_imgUrl, book_cost, book_price, book_inventory, store_name, book_id], (err, data) => {
        if (err) {
            return res.json({
                code: 501,
                msg: '修改失败',
            })
        }
        res.json({
            code: 200,
            msg: '修改成功',
            data
        })
    })
}

module.exports = updateBookController;