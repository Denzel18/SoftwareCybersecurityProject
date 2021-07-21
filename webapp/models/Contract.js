const mysql = require('mysql');

//non dobbiamo definire lo schema perché quello va fatto solo su MongoDB, qui basta creare la tabella (info dal web)

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'user',
  password:'user'
});

connection.connect(function(err){
   if(err){
      console.log(err);
   }
  console.log("Connected...");  
 });

connection.query('CREATE TABLE NOT EXISTS Contracts (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(128), address VARCHAR(255));', function(err) {
  if (err) throw err;
  console.log('Contract TABLE created.');
});
