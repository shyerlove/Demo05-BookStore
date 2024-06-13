const query = require('../db');
const fs = require('fs');
const path = require('path');

const addBookController = (req, res) => {
    const {
        hash,
        book_name,
        book_press,
        book_cost,
        book_inventory,
        book_class
    } = req.body;
    const { buffer, mimetype } = req.files[0];
    // 获取文件后缀名
    const type = mimetype.slice((mimetype.indexOf('/')) + 1);
    // 生成图片名
    const imgName = hash + '.' + type;
    // 拼接路径
    const imgPath = path.dirname(__dirname) + '\\public\\images\\' + imgName;
    // 保存图片在服务器中
    fs.writeFileSync(imgPath, buffer, 'base64');
    // 定义sql语句
    const sql = 'call add_book(?,?,?,?,?,?)';
    // 执行sql
    query(sql, [book_name, book_press, imgName, Number(book_cost), Number(book_inventory), book_class], (err, data) => {
        if (err) {
            return res.json({
                code: 501,
                msg: '添加失败'
            })
        }
        res.json({
            code: 200,
            msg: '添加成功'
        })
    })
}

module.exports = addBookController;
