var mysql = require('mysql');
const { exitOnError } = require('./logger');

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE if not exists cybersecurity", function (err, result) {
    if (err) 
      throw err
    else{
      console.log("Database created");
      process.exit(1);
    }
  });
   
});