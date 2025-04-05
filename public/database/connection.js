const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST || process.env.LOCAL_HOST,
    user: process.env.USER || process.env.LOCAL_USER,
    password: process.env.PASSWORD || process.env.LOCAL_PASSWORD,
    database: process.env.DATABASE || process.env.LOCAL_DATABASE
});

function query(sql, params, callback) {
    pool.query(sql, params, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
}

module.exports = { query };