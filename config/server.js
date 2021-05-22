const mysql = require('mysql')

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "controle"
});

module.exports = connect