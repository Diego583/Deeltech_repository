const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '35.192.148.0',
    user: 'root',
    database: 'proyecto',
    password: '',
});

module.exports = pool.promise();