const query = require('../db');

// 用户
const users = new Map();
// 商家
const stores = new Map();

const userOrderChar = (ws, req) => {
    const { user_id, store_id } = req.query;
    user_id && users.set(Number(user_id), ws);
    store_id && stores.set(Number(store_id), ws);


    ws.on('message', (msg) => {
        // 获取
        const { role, data, message } = JSON.parse(msg);
        // 定义回复信息
        let xx = '';
        if (role == 1) {
            // 用户
            // 获取参数
            const { id, books } = data;
            try {
                // 定义sql语句
                const sql = 'call buy_book(?,?,?,?,?);';
                // 执行支付行为
                /* 连接数据库 */
                books.forEach(b => {
                    query(sql, [b.shopCar_id, b.store_id, b.book_id, id, b.book_count], (err, data) => {
                        if (err) throw err;
                        // 判断商家在不在线
                        xx = { code: 200, type: 'warning', msg: '来新订单啦' }
                        stores.get(b.store_id) && stores.get(b.store_id).send(JSON.stringify(xx));
                    });
                })
                // 提示用户支付成功
                xx = { code: 200, type: 'success', msg: '支付成功' }
                ws.send(JSON.stringify(xx));
            } catch (error) {
                // 提示用户支付失败
                xx = { code: 200, type: 'error', msg: '支付失败' };
                ws.send(JSON.stringify(xx));
            }
        } else if (role == 2) {
            // 商家
            // 获取订单id
            const { user_id, userorder_id, tem } = data;
            // 定义sql语句
            const sql = 'call deliver(?,?) ;';
            // 处理订单
            query(sql, [userorder_id, tem], (err) => {
                if (err) {
                    // 提示错误信息
                    console.log(err);
                    xx = { code: 200, type: 'error', msg: '操作失败' }
                    ws.send(JSON.stringify(xx));
                    return;
                }
                // 提示商家操作成功
                xx = { code: 200, type: 'success', msg: '操作成功' }
                ws.send(JSON.stringify(xx));
                // 如果用户在线,告知用户订单已处理
                xx = { code: 200, type: 'warning', msg: '您有订单状态已更新' }
                users.get(user_id) && users.get(user_id).send(JSON.stringify(xx));
            })
        } else {
            // 心跳
            // console.log(message);
            ws.send(JSON.stringify({
                message: 'server...'
            }))
        }
    })
}

module.exports = userOrderChar;