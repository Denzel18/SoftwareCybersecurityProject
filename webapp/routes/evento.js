const express = require('express');
const router = express.Router();
const logger = require('../logger');
const isLoggedIn = require('../middleware/login');

const BigliettiService = require('../services/bigliettiService');
const EventoService = require('../services/EventoService');


const Sequelize = require("sequelize");
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
})

const ContractModel = require('../models/Contract')
const EventModel = require('../models/Evento');
const TicketModel = require('../models/Biglietto');
//const User = new Usermodel(database,Sequelize);

const Contract = require('web3-eth-contract');

Contract.setProvider('http://127.0.0.1:22000');


router.get('/', isLoggedIn, (req, res) => {

    logger.info('TEST EVENTO' + req.body)

    database.query('SELECT * FROM contract where lower(name) like \'evento%\'', {type: database.QueryTypes.SELECT}).then(async results => {

        if (results.length !== 0) {
            let list_out = []
            // for each found event
            for (const evento of results) {
                // get an instance of the event
                const eventoService = await EventoService.getInstance({
                    // user account address
                    account: req.session.user.account,
                    // host URL
                    host: 'http://localhost:22000',
                    // contract account address
                    address: evento.address
                });

                // TODO: solo per prova, togliere (l'inserimento dei dati dell'evento deve avvenire dopo il deploy del contratto)
                const evento_info = await eventoService.storeItem(1, 'Concerto X', 'Macerata', '20/12/2022', '21:00', 'Artista Y', 1500);


                // get title of the event
                const titolo = await eventoService.getTitolo();
                // get place of the event
                const luogo = await eventoService.getLuogo();
                // get capacity of the event
                const capienza = await eventoService.getCapienza();
                // get state of the event
                const stato = await eventoService.getStato();
                // get date of the event
                const data = await eventoService.getData();
                // get time of the event
                const orario = await eventoService.getOrario();
                // get artist of the event
                const artista = await eventoService.getArtista();

                const evnt = {
                    id: evento.id,
                    titolo: titolo,
                    luogo: luogo,
                    capienza: capienza,
                    stato: stato,
                    data: data,
                    orario: orario,
                    artista: artista
                }
                list_out.push(evnt)
            }

            return res.render('listaEventi', {title: 'Lista Eventi', results: list_out, user: req.session.user})
        } else {
            return res.redirect("/");
        }

    })
});

router.get("/:id", isLoggedIn, (req, res) => {

    const id = req.params.id

    logger.info('TEST EVENTO ID' + id)

    database.query('SELECT * FROM contract WHERE lower(name) like \'evento%\' AND id =' + id, {type: database.QueryTypes.SELECT}).then(async result => {

        if (result.length !== 0) {
            // get an instance of the event
            const eventoService = await EventoService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0].address
            });

            // get title of the event
            const titolo = await eventoService.getTitolo();
            // get place of the event
            const luogo = await eventoService.getLuogo();
            // get capacity of the event
            const capienza = await eventoService.getCapienza();
            // get state of the event
            const stato = await eventoService.getStato();
            // get date of the event
            const data = await eventoService.getData();
            // get time of the event
            const orario = await eventoService.getOrario();
            // get artist of the event
            const artista = await eventoService.getArtista();

            const evnt = {
                id: result[0].id,
                titolo: titolo,
                luogo: luogo,
                capienza: capienza,
                stato: stato,
                data: data,
                orario: orario,
                artista: artista
            }
            return res.render('evento', {title: 'Dettagli Evento', result: evnt, user: req.session.user})
        } else {
            return res.redirect('/');
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

router.get("/:id/acquistabiglietto", isLoggedIn, async (req, res) => {

    const id = req.params.id

    logger.info('TEST EVENTO ID' + id)

    database.query('SELECT * FROM contract WHERE lower(name) like \'evento%\' AND id =' + id, {type: database.QueryTypes.SELECT}).then(async result => {

        if (result.length !== 0) {
            // get an instance of the event
            const eventoService = await EventoService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0].address
            });

            let BigliettiService_ = await BigliettiService.getInstance({account: req.session.user.account});

            // get title of the event
            const titolo = await eventoService.getTitolo();
            // get place of the event
            const luogo = await eventoService.getLuogo();
            // get date of the event
            const data = await eventoService.getData();
            // get time of the event
            const orario = await eventoService.getOrario();
            // get artist of the event
            const artista = await eventoService.getArtista();
            // get tipologia biglietto
            const tipologia = await BigliettiService_.getTipoBiglietto(id);
            // get posti rimanenti
            const posti_rimanenti = await BigliettiService_.getPostiRimanenti(id);

            const evnt_info = {
                titolo: titolo,
                luogo: luogo,
                data: data,
                orario: orario,
                artista: artista,
                tipologia: tipologia,
                posti: posti_rimanenti
            }
            return res.render('acquisto_biglietto', {title: 'Acquisto Biglietto', result: evnt_info, user: req.session.user})
        } else {
            return res.redirect('/');
        }

    })
});

module.exports = router;