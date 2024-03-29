var mysql = require('mysql');
var util = require('util');

/**Ligação a Base de Dados remotemysql */
var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'remotemysql.com',
    user: '7U8oYvpBaP',
    password: '95bMyzkXic',
    database: '7U8oYvpBaP'
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        console.log(err);
    }
    if (connection) connection.release()
    return
})
// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports.pool = pool;