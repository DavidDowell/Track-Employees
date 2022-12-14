const msyql = require('mysql2');

require('dotenv').config();

const db = msyql
    .createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees'
    })
    .promise();

module.exports = db;