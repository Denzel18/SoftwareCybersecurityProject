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
const User = new Usermodel(database,Sequelize);


router.get('/login', (req, res) => {
    res.render('login', { title: "Login",  user: req.session.user, errorMsg: req.flash("error"), csrfToken: req.csrfToken() });
});

router.post('/login', (req, res) => {
    logger.info('TEST LOGIN')
    username = req.body.username;
    password = req.body.password;
    logger.info('USERNAME : '+username+' - '+password)

    database.query('SELECT * FROM Users', {type: database.QueryTypes.SELECT}).then(results=>{
        console.log(results);
    })

    database.query("SELECT * FROM Users WHERE username = '"+username+"'", {type: database.QueryTypes.SELECT}).then(results=>{
        console.log(results);

        if(results.length != 0){
            password_memo = results[0].password;
            account_memo = results[0].account;
            logger.info(`Tentativo di login positivo da parte di ${req.body.username}`);
            logger.info('pwd memorizzata : '+password_memo + ' pwd inserita : '+req.body.password)
            bcrypt.compare(req.body.password, password_memo, (err, result) => {
                if(result && !err) {
                    req.session.user = {
                        username: req.body.username,
                        account: account_memo
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

    })

    

    // User.findOne({where : { username: username }}, (err, user) => {
    //     if(err || !user) {
    //         logger.info(`Tentativo di login errato con username ${req.body.username}`);
    //         req.flash("error", "Utente o password errati, riprovare!");
    //         return res.redirect("/");
    //     } else {
    //         bcrypt.compare(req.body.password, user.password, (err, result) => {
    //             if(result && !err) {
    //                 req.session.user = {
    //                     username: req.body.username,
    //                     account: user.account
    //                 };
    //                 logger.info(`Login eseguito dall'utente ${req.body.username}`);
    //                 return res.redirect("/");
    //             } else {
    //                 logger.info(`Tentativo di login errato da parte di ${req.body.username}`);
    //                 req.flash("error", "Utente o password errati, riprovare!");
    //                 return res.redirect("/login");
    //             }
    //         });
    //     }
    // });
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
    })
    return res.redirect("/login");
});

module.exports = router;