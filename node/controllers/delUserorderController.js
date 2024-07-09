const query = require('../db');

const delUserorderController = (req, res) => {
    const { userorder_id, state } = req.body;
    let errMsg, okMsg;
    let sql = 'call dealUserorder(?,?) ;';
    switch (state) {
        case 'OK':
            // 确认收货
            errMsg = { code: 501, msg: '服务器异常', type: 'error' };
            okMsg = { code: 200, msg: '期待您的下次消费', type: 'success' };
            break;
        case 'DELETE':
            errMsg = { code: 501, msg: '删除失败', type: 'error' };
            okMsg = { code: 200, msg: '订单已删除', type: 'success' };
            // 删除订单
            break;
        case 'REFUND':
            // 退款
            errMsg = { code: 501, msg: '退款失败，请重新尝试', type: 'error' };
            okMsg = { code: 200, msg: '已申请退款', type: 'success' };
            break;
        default:
            break;
    }

    query(sql, [userorder_id, state], (err) => {
        if (err) {
            console.log(err);
            return res.json(errMsg);
        }
        res.json(okMsg);
    });
}

module.exports = delUserorderController;