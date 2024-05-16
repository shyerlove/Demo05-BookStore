// 导入express模块
const express = require('express');
const router = require('./webapi/router');
//导入校验token的中间件
const vToken = require('./middle/vToken');
// 创建app实例
const app = express();


/* 配置跨域 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', ['token', 'Content-Type']);
    next();
});

app.use(vToken);
app.use('/webapi', router);
app.all((req, res) => {
    res.json({
        code: 404,
        msg: '文件资源找不到',
    });
})

// 监听端口，启动服务
app.listen(3002, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('3002监听中...');
})
