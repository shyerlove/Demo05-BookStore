const query = require('../db');

// 管理员集合
const users = new Map();
// 商家集合
const stores = new Map();

const stockOrderChar = (ws, req) => {
    // 获取查询参数
    const { user_id, store_id } = req.query;
    // 记录用户
    if (user_id) {
        users.set(Number(user_id), ws); // 记录管理员
        console.log(user_id, '管理员已连接');
    } else {
        stores.set(Number(store_id), ws); // 记录商家
        console.log(store_id, '商家已连接');
    }

    ws.on('message', (msg) => {
        // 获取数据  
        const { role, data, message } = JSON.parse(msg);
        // 定义回复消息
        let xx;
        // 判断用户身份，执行不同操作
        if (role == 0) {
            /* 管理员 */
            // 处理订单
            const { store_id, stock_id, stock_state } = data;
            const sql1 = 'call adminDoOrder(?,?) ;';
            query(sql1, [stock_id, stock_state], (err, sqldata) => {
                if (err) {
                    console.log(err);
                    xx = { code: 501, type: 'error', msg: '服务器错误' }
                } else {
                    xx = { code: 200, type: 'success', msg: '操作成功' }
                }
                // 告知管理员操作结果
                ws.send(JSON.stringify(xx));
                // 告知商家更新订单数据
                if (stores.get(store_id)) {
                    xx = { code: 200, type: 'warning', msg: '您有订单已被处理' }
                    stores.get(store_id).send(JSON.stringify(xx));
                }
            });

        } else if (role == 2) {
            /* 商家 */
            const sql = 'call addStockState(?,?,?) ;';
            const { store_id, book_id, count } = data;
            query(sql, [store_id, book_id, count], (err) => {
                if (err) {
                    console.log(err);
                    xx = { code: 501, type: 'error', msg: '服务器错误' }
                    ws.send(JSON.stringify(xx));
                    return;
                }
                // 告知商家下单成功
                xx = { code: 200, type: 'success', msg: '下单成功' }
                ws.send(JSON.stringify(xx));
                // 告知管理员更新订单
                xx = { code: 200, type: 'warning', msg: '有新的订单来啦' }
                users.forEach((item) => item.send(JSON.stringify(xx)))
            })
        } else {
            console.log(message);
            ws.send(JSON.stringify({
                message: 'server...'
            }));
        }
    })


    ws.on('error', (err) => {
        console.log(err);
    })
}

module.exports = stockOrderChar;