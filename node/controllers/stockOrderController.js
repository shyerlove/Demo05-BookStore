const query = require('../db');

const stockOrderController = (req, res) => {
    const { stock_id, price, msg } = req.body;
    if (price) {
        const sql = 'call stock(?,?,?); ';
        query(sql, [stock_id, price, msg], (err) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '入库失败',
                    type: 'error'
                })
            }
            res.json({
                code: 200,
                msg: '入库成功',
                type: 'success'
            })
        })
    } else {
        const sql = 'delete from stocktable where stock_id = ? ;';
        query(sql, [stock_id], (err) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '删除失败',
                    type: 'error'
                })
            }
            res.json({
                code: 200,
                msg: '删除成功',
                type: 'success'
            })
        })
    }


}

module.exports = stockOrderController;