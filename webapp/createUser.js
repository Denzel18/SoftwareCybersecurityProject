const connect = require('./connect');

// TODO: fare in modo che connectToDB() restituisca l'oggetto connection
const connection = connect.connectToDB();

const query = "CREATE TABLE if not exists users (username VARCHAR(255), password VARCHAR(255), account VARCHAR(255))";

// connection.query(query, function (err, result) {
//     if (err) {
//         throw err
//     } else {
//         console.log("Table users created.");
//     }
// });
