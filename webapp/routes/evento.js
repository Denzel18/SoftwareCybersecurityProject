const express = require("express");
const router = express.Router();
const logger = require("../logger");
const isLoggedIn = require("../middleware/login");

const BigliettiService = require("../services/bigliettiService");


const ContractModel = require('../models/Contract')

const Sequelize = require("sequelize");
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
})


const EventModel = require('../models/Evento');
const TicketModel = require('../models/Biglietto');
//const User = new Usermodel(database,Sequelize);


router.get('/', (req, res) => {

    logger.info('TEST EVENTO' + req.body)

    database.query('SELECT * FROM Evento', {type: database.QueryTypes.SELECT}).then(results => {

        if (results.length != 0) {
            console.log(results);
            //const bigliettiContract =  ContractModel.create({name: 'EVENTO', address:'Evento.address' });
            console.log("Biglietti auto-generated ID:", bigliettiContract.id);
            return res.render('evento', {title: "Eventi", results: results, user: req.session.user})
        } else {
            return res.redirect("/");
        }

    })
});

router.get("/:id", (req, res) => {

    const id = req.params.id

    logger.info('TEST EVENTO ID' + id)

    database.query('SELECT * FROM Evento WHERE id =' + id, {type: database.QueryTypes.SELECT}).then(results => {

        if (results.length != 0) {
            console.log(results);
            return res.render('evento', {title: "Eventi", results: results, user: req.session.user})
        } else {
            return res.redirect("/");
        }

    })
});

router.get("/biglietti/:id", isLoggedIn, async (req, res) => {

    const id = req.params.id

    logger.info('GET BIGLIETTI DATO ID EVENTO' + id)


    let BigliettiService_ = await BigliettiService.getInstance({account: req.session.user.account});
    let biglietti = await BigliettiService_.getBiglietti();

    // database.query('SELECT * FROM Biglietto WHERE id_evento ='+id, {type: database.QueryTypes.SELECT}).then(results=>{

    //     if(results.length != 0){
    //         console.log(results);
    //         return res.render('evento',{ title: "Eventi", results: results, user: req.session.user })
    //     }else{
    //         return res.redirect("/");
    //     }

    // })

    if (biglietti.length != 0) {
        console.log(biglietti);
        return res.render('biglietti', {title: "Eventi", results: biglietti, user: req.session.user})
    } else {
        return res.redirect("/");
    }
});

module.exports = router;