// 导入express模块
const express = require('express');

// 创建app实例
const app = express();

// 导入bodyparser模块
const bodyParser = require('body-parser');

// 创建ws模块
const ws = require('express-ws')(app);


// 导入校验token的中间件
const vToken = require('./middle/vToken');


// 导入路由
const api = require('./api/img');
const webRouter = require('./webapi/router');
const wsRouter = require('./wsapi/router');


/* 配置跨域 */
app.all('*', function (req, res, next) {
    // console.log(`收到请求: ${req.method} ${req.url}`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "token, Content-Type");
    next();
});

// 使用中间件
app.use(bodyParser.json());
app.use(vToken); // 校验token

// 配置路由
app.use('/webapi', webRouter);
app.use('/wsapi', wsRouter);
app.use('/', api);

// 处理404错误
app.all((req, res) => {
    res.status(404).json({
        code: 404,
        msg: '文件资源找不到',
    });
});

// 监听端口，启动服务
app.server = app.listen(3002, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('3002监听中...');
});
