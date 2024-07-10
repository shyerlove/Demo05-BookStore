const query = require('../db');
const fs = require('fs');
const path = require('path');
const uploadHeadController = (req, res) => {
    const { hash, id, role } = req.body;
    const { buffer, mimetype } = req.files[0];

    // 获取文件后缀名
    const type = mimetype.slice((mimetype.indexOf('/') + 1));
    // 生成图片名
    const imgName = hash + '.' + type;
    // 拼接路径
    const imgPath = path.dirname(__dirname) + '/public/heads/' + imgName;
    // 保存图片在服务器中
    !fs.existsSync(imgPath) && fs.writeFileSync(imgPath, buffer, 'base64');
    // 修改数据
    let sql = 'CALL uploadHead(?,?,?);';
    query(sql, [Number(id), Number(role), imgName], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({
                code: 501,
                msg: '修改头像失败',
                type: 'error'
            })
        }
        res.json({
            code: 200,
            msg: '头像更新成功',
            type: 'success',
            data: data[0][0]
        })
    })
}

module.exports = uploadHeadController;