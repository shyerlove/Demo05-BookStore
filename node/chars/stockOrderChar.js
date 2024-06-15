const query = require('../db');

// 管理员集合
const users = new Map();
// 商家集合
const stores = new Map();

const stockOrderChar = (ws, req) => {
    // 获取查询参数
    const { user_id, role } = req.query;
    // 记录用户
    if (+role === 0) {
        users.set(Number(user_id), ws); // 记录管理员
    } else {
        stores.set(Number(user_id), ws); // 记录商家
    }

    ws.on('message', (msg) => {
        // 获取数据
        const { role, data } = JSON.parse(msg);
        // 定义回复消息
        let xx;
        // 判断用户身份，执行不同操作
        if (+role == 0) {
            /* 管理员,更新订单状态 */
            const sql = 'update stocktable set stock_state = ? where stock_id = ?;';
            const { user_id, stock_state, stock_id } = data;
            query(sql, [stock_state, stock_id], (err) => {
                if (err) {
                    console.log(err);
                    xx = { code: 501, type: 'error', msg: '网络异常' }
                    ws.send(JSON.stringify(xx));
                    return;
                }
                // 告知管理员操作成功
                xx = { code: 200, type: 'success', msg: '操作成功' }
                ws.send(JSON.stringify(xx));

                // 处理订单
                const sql1 = 'call';
                query(sql1, [stock_id], (err) => {
                    if (err) { }
                    // 告知商家订更新订单数据
                    xx = { code: 200, type: 'warning', msg: '您有订单已被处理' }
                    stores.get(user_id).send(JSON.stringify(xx));
                })
            });

        } else {
            /* 商家 */
            const sql = 'call addStockState(?,?,?) ;';
            const { user_id, book_id, count } = data;
            query(sql, [user_id, book_id, count], (err) => {
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
        }
    })


    ws.on('error', (err) => {
        console.log(err);
    })
}

module.exports = stockOrderChar;