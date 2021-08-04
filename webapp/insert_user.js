var mysql = require('mysql');
const { exitOnError } = require('./logger');

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "user",
  database : "cybersecurity"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Username: admin Password: admin
  con.query("INSERT into user (id, name, username, password, account, type) values ('1', 'Luca Rossi', 'admin', '$2b$10$STop8hMjsywnmwy.XWAKkunhoGU7MPiiaraSMKjD5KVsqKv1OKj6G', '0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'admin');", function (err, result) {
    if (err) 
      throw err
    else{
      console.log("Admin added");
    }
  });
  //-- Username: invalidator Password: invalidator
  con.query("INSERT into user (id, name, username, password, account, type) values ('2', 'Giovanni Rossi', 'invalidator', '$2b$10$ENaa26rmvVJIyH.O4hkzQ.XlmyKv5M4UpjGNsor0hOrwU9z3mDUOe','0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'invalidator');", function (err, result) {
    if (err) 
      throw err
    else{
      console.log("Invalidator added");
    }
  });
  //-- Username: user Password: user
  con.query("INSERT into user (id, name, username, password, account, type) values ('3', 'Mario Rossi', 'user', '$2b$10$CsC/5Mcf8XTXiZkNndc5PecVJazyHRezC89DiVYAVPjbdaI8sm1fq', '0xed9d02e382b34818e88b88a309c7fe71e65f419d', 'user');", function (err, result) {
    if (err) 
      throw err
    else{
      console.log("User added");
      process.exit(1);
    }
  });   
});



