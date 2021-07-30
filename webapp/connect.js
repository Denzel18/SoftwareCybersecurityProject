const mysql = require('mysql');

// database params
const DB_params = {
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'cybersecurity'
};

/**
 * Function that opens the connection to the defined DB.
 * If the DB does not exist than creates it, after creation tries to re-open the connection with the DB.
 */
exports.connectToDB = () => {
    // create connection with the DB
    let connection = mysql.createConnection(DB_params);

    // open connection to the DB
    connection.connect(function (err) {
        if (err) {
            if (err.code === 'ER_BAD_DB_ERROR') {
                // DB does not exist
                const copy_of_params = Object.assign({}, DB_params);
                copy_of_params.database = '';
                connection = mysql.createConnection(copy_of_params);
                // create DB
                connection.query("CREATE DATABASE if not exists " + DB_params.database, function (err, result) {
                    if (err) {
                        console.error('error creating table: ' + err.stack);
                    } else {
                        console.log("Database created.");
                        connection = mysql.createConnection(DB_params);
                        // open connection to the DB
                        connection.connect(function (err) {
                            if (err) {
                                console.error('error connecting: ' + err.stack);
                            } else {
                                console.log('Connected!');
                            }
                        });
                    }
                });
            } else {
                console.error('error connecting: ' + err.stack);
            }
        } else {
            console.log("DB already exists... Connected!");
        }
    });
}
