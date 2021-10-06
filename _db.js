const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'fun'
});



module.exports = pool;