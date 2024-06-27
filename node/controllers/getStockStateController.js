const query = require('../db');

const getStockStateController = (req, res) => {
    const { store_id } = req.query;
    let sql;
    if (store_id) {
        sql = 'select stock_id,stocktable.book_id, book_name, book_press,book_inventory,book_cost,count,(book_cost * count) all_price,stock_state from stocktable,bookdata where stocktable.book_id = bookdata.book_id and store_id = ? ;';
    } else {
        sql = 'select stock_id,stocktable.store_id, store_name, stocktable.book_id, book_name, book_inventory,book_cost,count,(book_cost * count) all_price,stock_state from stocktable,bookdata,stores where stocktable.book_id = bookdata.book_id and stores.store_id = stocktable.store_id and stock_state = 1 ;';
    }
    query(sql, [store_id], (err, data) => {
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
}

module.exports = getStockStateController;