const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/login');
const mysql = require("mysql");
// const connection = require('../connect')
const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "cybersecurity"
});
/* GET users listing. */
router.get('/', isLoggedIn, (req, res, next) => {
    let username = req.session.user.username;
    let query = "SELECT * FROM user WHERE username = ?";
    con.query(query, [username], function (err, result){
        return res.render("user", {title: "Utente", user: result[0]});
    });
});

module.exports = router;
