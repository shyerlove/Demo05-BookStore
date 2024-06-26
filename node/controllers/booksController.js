// const mysql = require('mysql');
// const sqlConfig = require('../sql.config');
// /* 创建数据库连接对象 */
// const connection = mysql.createConnection(sqlConfig);
const query = require('../db');

const booksController = (req, res) => {
    if (req.method === 'GET') {
        const sql = 'select * from books.bookdata ;';
        query(sql, [], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '获取失败',
                    data: null
                })
            }
            res.json({
                code: 200,
                msg: '获取图书数据成功',
                data
            });
        })
    } else {
        const { index, pageSize } = req.body;
        /* 定义查询语句 */
        let sql = 'select * from books.bookData limit ?,?;';
        /* 查询数据库，获取购图书数据 */
        query(sql, [Number(index), Number(pageSize)], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    code: 500,
                    msg: '获取失败',
                    data: null
                })
            }
            const { book_imgUrl } = data;
            res.json({
                code: 200,
                msg: '获取图书数据成功',
                data
            });
        })
    }

}

module.exports = booksController;