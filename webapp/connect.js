const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'user',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE IF NOT EXISTS cybersecurity", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});
module.exports=connection;