const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const logger = require("../logger");

const Sequelize = require("sequelize");
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
})


const Usermodel = require("../models/User");
const User = new Usermodel(database, Sequelize);


router.get('/', (req, res) => {
    res.render('login', {
        title: "Login",
        user: req.session.user,
        errorMsg: req.flash('error'),
        successMsg: req.flash('success'),
        csrfToken: req.csrfToken()
    });
});

router.post('/', (req, res) => {
    logger.info('TEST LOGIN')
    username = req.body.username;
    password = req.body.password;
    logger.info('USERNAME : ' + username + ' - ' + password)

    database.query({
        query: 'SELECT * FROM user WHERE username = ?',
        values: [username],
        type: database.QueryTypes.SELECT}).then(async results => {

        if (results.length !== 0) {
            const password_memo = results[0][0].password;
            const account_memo = results[0][0].account;
            const type_memo = results[0][0].type;
            logger.info(`Tentativo di login positivo da parte di ${req.body.username}`);
            logger.info('pwd memorizzata : ' + password_memo + ' pwd inserita : ' + req.body.password)
            bcrypt.compare(req.body.password, password_memo, (err, result) => {
                if (result && !err) {
                    req.session.user = {
                        username: req.body.username,
                        account: account_memo,
                        type: type_memo
                    };
                    logger.info(`Login eseguito dall'utente ${req.body.username}`);
                    return res.redirect("/");
                } else {
                    logger.info(`Tentativo di login errato da parte di ${req.body.username}`);
                    req.flash("error", "Utente o password errati, riprovare!");
                    return res.redirect("/login");
                }
            });
        } else {
            logger.info(`Tentativo di login errato da parte di ${req.body.username}`);
            req.flash("error", "Utente o password errati, riprovare!");
            return res.redirect("/login");
        }

    }).catch(error => {
        req.flash("error", "Utente o password errati, riprovare!");
        return res.redirect("/login");
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
    })
    return res.redirect("/login");
});

module.exports = router;