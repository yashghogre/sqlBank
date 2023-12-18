const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'test',
    password: 'root'
});

module.exports = pool;