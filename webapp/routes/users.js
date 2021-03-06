const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/login');
const mysql = require("mysql");
const userModel = require("../models/User")
const logger = require('../logger');
const csurf = require('csurf')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const UniqueConstraintError = require('sequelize/lib/errors/validation/unique-constraint-error.js')
const Web3Utils = require('web3-utils');


// setup route middlewares
var csrfProtection = csurf({cookie: true})
var parseForm = bodyParser.urlencoded({extended: false});

const bcrypt = require("bcrypt");
// const bcrypt = require("bcryptjs")

const User = require('../models/User');

const Sequelize = require("sequelize");


const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
});


// const connection = require('../connect')
const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "cybersecurity"
});

router.get('/', isLoggedIn, (req, res, next) => {
    let username = req.session.user.username;
    let query = "SELECT * FROM user WHERE username = ?";
    con.query(query, [username], function (err, result) {
        return res.render("user", {
            title: "Utente",
            errorMsg: req.flash('error'),
            successMsg: req.flash('success'),
            user: result[0]
        });
    });
});


router.get('/new', csrfProtection, function (req, res) {
    res.render('newuser', {
        title: "Nuovo Utente",
        user: null,
        errorMsg: req.flash("error"),
        csrfToken: req.csrfToken()
    });
});

router.post('/new', (req, res) => {
    logger.info('GET - INSERIMENTO NUOVO UTENTE');

    nome = req.body.nome;
    cognome = req.body.cognome;
    account = String(req.body.account);
    username = req.body.username;
    password = req.body.password;

    if (!Web3Utils.isAddress(account)) {

        console.log('Errore: Account non valido')
        req.flash('error', 'Indirizzo Wallet non valido');
        res.redirect('/user/new');
    }

    else {

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            throw err
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    throw err
                } else {
                    password_ = hash;
                    nominativo = nome + ' ' + cognome;
                    // let ts = Date.now();
                    // let date_ob = new Date(ts);
                    // let date = date_ob.getDate();
                    // let month = date_ob.getMonth() + 1;
                    // let year = date_ob.getFullYear();
                    // data_ = "'" + year + "-" + month + "-" + date + "'";

                    database.query({
                        query: "INSERT into user (name, username, password, account, type) values (?,?,?,?,?)",
                        values: [nominativo, username, password_, account, 'user'],
                        type: database.QueryTypes.INSERT
                    }).then(results => {
                        if (results.length !== 0) {
                            req.flash("success", "Utente Creato");
                            return res.redirect("/login");
                        } else {
                            console.log('Errore creazione utente');
                            return res.redirect("/user/new");
                        }
                    }).catch(error => {
                        if (error instanceof UniqueConstraintError) {
                            req.flash('error', 'Username gi?? utilizzato.');
                            res.redirect('/')
                        } else {
                            error = {
                                status: '500',
                                stack: error,
                                message: 'Errore Query'
                            }

                            return res.render("error", {title: 'Errore', error: error, user: req.session.user});
                        }
                    });
                }
            })
        }
    })
}});


module.exports = router;
