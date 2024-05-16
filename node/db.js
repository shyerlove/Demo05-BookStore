const mysql = require('mysql');
const sqlConfig = require('./sql.config');
/* 创建数据库连接对象 */
const pool = mysql.createPool(sqlConfig);

const query = (sql, params, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        connection.query(sql, params, (err, data) => {
            callback(err, data);
            connection.release();
        })
    })
}

module.exports = query;