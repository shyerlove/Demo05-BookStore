const query = require('../db');
const fs = require('fs');
const path = require('path');
const updateBookController = (req, res) => {
    const {
        hash,
        book_name,
        book_press,
        book_cost,
        book_price,
        book_inventory,
        store_name,
        book_id
    } = req.body;
    const { buffer, mimetype } = req.files[0];

    // 获取文件后缀名
    const type = mimetype.slice((mimetype.indexOf('/') + 1));
    // 生成图片名
    const imgName = hash + '.' + type;
    // 拼接路径
    const imgPath = path.dirname(__dirname) + '/public/images/' + imgName;
    // 保存图片在服务器中
    fs.writeFileSync(imgPath, buffer, 'base64');
    // 修改数据
    const sql = 'update bookData set book_name=?,book_press=?,book_imgUrl=?,book_cost=?,book_price=?,book_inventory=?,store_name=? where book_id=?;';
    query(sql, [book_name, book_press, imgName, Number(book_cost), Number(book_price), Number(book_inventory), store_name, Number(book_id)], (err, data) => {
        if (err) {
            return res.json({
                code: 501,
                msg: '修改失败',
            })
        }
        res.json({
            code: 200,
            msg: '修改成功'
        })
    })
}

module.exports = updateBookController;