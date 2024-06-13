const query = require('../db');

const getBookClassController = (req, res) => {
    const sql = 'select book_class,count(book_class) class_count from bookdata group by book_class;';
    try {
        query(sql, [], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '查询失败'
                })
            }
            return res.json({
                code: 200,
                msg: '查询成功',
                data
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBookClassController;