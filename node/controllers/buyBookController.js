const query = require('../db');
const getQueryCount = require('../utils/getQueryCount');

const buyBookController = (req, res) => {
    /* 获取请求参数 */
    const { user_id, books } = req.body;
    const str = getQueryCount(books);
    let ids = [];
    books.forEach(item => ids.push(item[0]))
    /* 定义SQL语句 */
    let sql = `delete from shopcar where user_id=? and book_id in(${str});`;
    try {
        query(sql, [user_id, ...ids], () => { });
        books.forEach((item) => {
            sql = ` update bookdata set book_inventory = book_inventory-${item[1]} where book_id=${item[0]}; `;
            query(sql, [], () => { });
        })
    } catch (error) {
        console.log(error);
    } finally {
        res.json({
            code: 200,
            msg: '支付成功'
        })
    }
}

module.exports = buyBookController;