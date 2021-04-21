//GOOGLE CLOUD
/*const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '35.192.148.0',
    user: 'root',
    database: 'proyecto',
    password: '',
});

module.exports = pool.promise();*/

//XAMPP
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proyectoo',//CAMBIAR!!
    password: '',
});

module.exports = pool.promise();