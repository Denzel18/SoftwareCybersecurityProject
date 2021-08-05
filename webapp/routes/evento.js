const express = require('express');
const router = express.Router();
const logger = require('../logger');
const isLoggedIn = require('../middleware/login');
const {isAdmin, isInvalidator, isUser, isAdminOrInvalidator} = require('../middleware/accounts');
const createTaxSeal = require('../utils/TaxSealCreation');
const paymentVerification = require('../utils/paymentVerification')

const BigliettiService = require('../services/bigliettiService');
const EventoService = require('../services/EventoService');


const Sequelize = require("sequelize");
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
})

// const ContractModel = require('../models/Contract')
// const EventModel = require('../models/Evento');
// const TicketModel = require('../models/Biglietto');
// const User = new Usermodel(database,Sequelize);

const Contract = require('web3-eth-contract');
const fs = require("fs");

Contract.setProvider('http://127.0.0.1:22000');

router.get('/', isLoggedIn, async (req, res) => {

    logger.info('TEST EVENTO' + req.body)
    try {
        database.query({
            query: 'SELECT * FROM contract where lower(name) = ? ',
            values: ['evento'],
            type: database.QueryTypes.SELECT
        }).then(async results => {
            if (results.length !== 0) {
                let list_out = []
                // for each found event
                let i = 0;

                results = Object.values(JSON.parse(JSON.stringify(results)));
                for (const evento of results[0]) {
                    // get an instance of the event
                    const eventoService = await EventoService.getInstance({
                        // user account address
                        account: req.session.user.account,
                        // host URL
                        host: 'http://localhost:22000',
                        // contract account address
                        address: evento.address
                    });

                    // get id of the event
                    const id = await eventoService.getId();
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
                    // get timestamp of the event
                    const timestamp = await eventoService.getTimestamp();

                    // get remaining slots
                    let remainingSlots;

                    await database.query({
                        query: 'SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?',
                        values: ['biglietti_evento_%', id]
                    }, function (err) {
                        if (err) throw err;
                    }).then(async result => {
                        result = Object.values(JSON.parse(JSON.stringify(result)));
                        if (result.length !== 0) {
                            // get an instance of the tickets
                            const bigliettiSevice = await BigliettiService.getInstance({
                                // user account address
                                account: req.session.user.account,
                                // host URL
                                host: 'http://localhost:22000',
                                // contract account address
                                address: result[0][0].address
                            });

                            // invalidate the ticket
                            remainingSlots = await bigliettiSevice.getPostiRimanenti();
                        }
                    }).catch(error => {
                        //return res.status(400).json({ error: error.toString() });
                        // req.flash('error', 'errore con la query');
                        error = {
                            status: '500',
                            stack: error,
                            message: 'Errore Query'
                        }

                        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
                    })

                    const evnt = {
                        id: id,
                        titolo: titolo,
                        luogo: luogo,
                        capienza: capienza,
                        stato: stato,
                        data: data,
                        orario: orario,
                        artista: artista,
                        timestamp: timestamp,
                        remainingSlots: remainingSlots
                    }
                    i = i + 1;
                    list_out.push(evnt)

                }

                return res.render('listaEventi', {title: 'Lista Eventi', results: list_out, user: req.session.user})
            } else {
                req.flash('error', 'ERRORE, nessun contratto evento trovato.');
                return res.redirect("/");
            }
        }).catch(error => {
            //return res.status(400).json({ error: error.toString() });
            // req.flash('error', 'errore con la query');
            error = {
                status: '500',
                stack: error,
                message: 'Errore Query'
            }

            return res.render("error", {title: 'Errore', error: error, user: req.session.user});
        })
    } catch (error) {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }
        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    }
    ;
});


router.get("/id/:id", isLoggedIn, (req, res) => {

    const id = req.params.id

    logger.info('TEST EVENTO ID' + id)
    try {
        database.query({
            query: 'SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?',
            values: ['evento', id],
            type: database.QueryTypes.SELECT
        }).then(async result => {
            if (result.length !== 0) {
                // get an instance of the event
                const eventoService = await EventoService.getInstance({
                    // user account address
                    account: req.session.user.account,
                    // host URL
                    host: 'http://localhost:22000',
                    // contract account address
                    address: result[0][0].address
                });


                // get id of the event
                const id = await eventoService.getId();
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

                // get remaining slots
                let remainingSlots;

                await database.query({
                    query: 'SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?',
                    values: ['biglietti_evento_%', id]
                }, function (err) {
                    if (err) throw err;
                }).then(async result => {
                    result = Object.values(JSON.parse(JSON.stringify(result)));

                    if (result.length !== 0) {
                        // get an instance of the tickets
                        const bigliettiSevice = await BigliettiService.getInstance({
                            // user account address
                            account: req.session.user.account,
                            // host URL
                            host: 'http://localhost:22000',
                            // contract account address
                            address: result[0][0].address
                        });

                        // invalidate the ticket
                        remainingSlots = await bigliettiSevice.getPostiRimanenti();
                    }
                }).catch(error => {
                    //return res.status(400).json({ error: error.toString() });
                    // req.flash('error', 'errore con la query');
                    error = {
                        status: '500',
                        stack: error,
                        message: 'Errore Query'
                    }

                    return res.render("error", {title: 'Errore', error: error, user: req.session.user});
                });

                const evnt = {
                    id: id,
                    titolo: titolo,
                    luogo: luogo,
                    capienza: capienza,
                    stato: stato,
                    data: data,
                    orario: orario,
                    artista: artista,
                    remainingSlots: remainingSlots
                }
                return res.render('evento', {title: 'Dettagli Evento', result: evnt, user: req.session.user})
            } else {
                req.flash('error', 'ERRORE, il contratto dell\'evento selezionato non è stato trovato.');
                return res.redirect('/');
            }

        }).catch(error => {
            //return res.status(400).json({ error: error.toString() });
            // req.flash('error', 'errore con la query');
            error = {
                status: '500',
                stack: error,
                message: 'Errore Query'
            }

            return res.render("error", {title: 'Errore', error: error, user: req.session.user});
        })

    } catch (error) {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    }
});

router.get("/id/:id/biglietti", isLoggedIn, isAdminOrInvalidator, async (req, res) => {

    const id = req.params.id;

    logger.info('GET BIGLIETTI DATO ID EVENTO' + id)

    try {
        database.query({
            query: "SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?",
            values: ['biglietti_evento_%', id],
            type: database.QueryTypes.SELECT
        }).then(async result => {
            if (result.length !== 0) {
                // get an instance of the tickets
                const bigliettiSevice = await BigliettiService.getInstance({
                    // user account address
                    account: req.session.user.account,
                    // host URL
                    host: 'http://localhost:22000',
                    // contract account address
                    address: result[0][0].address
                });

                const biglietti = await bigliettiSevice.getBiglietti();

                return res.render('listaBiglietti', {
                    title: 'Biglietti Venduti',
                    results: biglietti,
                    user: req.session.user,
                    id_evento: id
                })
            } else {
                req.flash('error', 'ERRORE, contratto biglietti non trovato.');
                return res.redirect('/');
            }
        }).catch(error => {
            error = {
                status: '500',
                stack: error,
                message: 'Errore Query'
            }

            return res.render("error", {title: 'Errore', error: error, user: req.session.user});
        });
    } catch (error) {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});

    }


});

router.get("/id/:id/acquistabiglietto", isLoggedIn, async (req, res) => {

    return res.render('acquistoBiglietto', {
        title: 'Acquista Biglietto',
        id_evento: req.params.id,
        user: req.session.user,
        errorMsg: req.flash("error"),
        csrfToken: req.csrfToken()
    })
});


router.post("/id/:id/acquistabiglietto", isLoggedIn, async (req, res) => {

    const id = req.params.id;
    try {
        await database.query({
            query: 'SELECT * FROM contract WHERE lower(name) = ? AND id_evento = ?',
            values: ['evento', id]
        }, function (err) {
            if (err) throw err;
        }).then(async result => {
            result = Object.values(JSON.parse(JSON.stringify(result)));

            if (result.length !== 0) {
                // get an instance of the tickets
                const eventoService = await EventoService.getInstance({
                    // user account address
                    account: req.session.user.account,
                    // host URL
                    host: 'http://localhost:22000',
                    // contract account address
                    address: result[0][0].address
                });

                // check the state of the event
                const stato_evento = await eventoService.getStato();

                if (stato_evento !== 'Attivo') {
                    req.flash('error', 'ERRORE, si possono acquistare biglietti soltanto degli eventi con stato \'Attivo\'.');
                    return res.redirect('/');
                } else {
                    const id_evento = req.params.id;

                    database.query({
                        query: "SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?",
                        values: ['biglietti_evento_%', id_evento],
                        type: database.QueryTypes.SELECT
                    }).then(async result => {
                        if (result.length !== 0) {
                            // get an instance of the tickets
                            const bigliettiSevice = await BigliettiService.getInstance({
                                // user account address
                                account: req.session.user.account,
                                // host URL
                                host: 'http://localhost:22000',
                                // contract account address
                                address: result[0][0].address
                            });

                            // check remaining slots
                            const remainingSlots = await bigliettiSevice.getPostiRimanenti();
                            if (remainingSlots < 1) {
                                req.flash('error', 'ERRORE, non ci sono più posti disponibili per l\'evento selezionato.');
                                return res.redirect('/');
                            } else {
                                const payment = paymentVerification();
                                console.log('ESITO PAGAMENTO: ' + payment);

                                let ticketType, ticketPrice, sigillo;
                                if (payment) {
                                    ticketType = req.body.ticket_type;

                                    switch (ticketType) {
                                        case 'platinum':
                                            ticketType = 0;
                                            ticketPrice = '59.99';
                                            break;
                                        case 'gold':
                                            ticketType = 1;
                                            ticketPrice = '39.99';
                                            break;
                                        default:
                                            ticketType = 2;
                                            ticketPrice = '19.99';
                                    }

                                    sigillo = createTaxSeal();
                                } else {
                                    req.flash('error', 'ERRORE, pagamento fallito.');
                                    return res.redirect('/');
                                }

                                // store the sold ticket
                                const ticket_info = await bigliettiSevice.storeItem(new Date().toISOString(), sigillo, ticketPrice, ticketType);
                                req.flash('success', 'Biglietto acquistato correttamente.');
                            }
                        } else {
                            req.flash('error', 'ERRORE, contratto biglietti non trovato.');
                        }
                        return res.redirect('/');
                    }).catch(error => {
                        error = {
                            status: '500',
                            stack: error,
                            message: 'Errore Query'
                        }

                        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
                    });

                }
            }
        }).catch(error => {
            error = {
                status: '500',
                stack: error,
                message: 'Errore Query'
            }

            return res.render("error", {title: 'Errore', error: error, user: req.session.user});
        });

    } catch (error) {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    }
});


router.get('/newevento', isLoggedIn, isAdmin, (req, res) => {
    logger.info('Form di creazione evento');

    let nextEventId;
    database.query('SELECT * FROM contract where lower(name)=\'evento\'', {type: database.QueryTypes.SELECT}).then(async results => {

        nextEventId = results.length;
        res.render('evento_form', {
            title: 'Crea Evento',
            user: req.session.user,
            csrfToken: req.csrfToken(),
            id: nextEventId
        });
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });
});


router.post('/newevento', isLoggedIn, isAdmin, async (req, res) => {
    logger.info('Inizio Salvataggio Evento ...')
    const id = req.body.id;
    const titolo = req.body.titolo;
    const luogo = req.body.luogo;
    const data = req.body.date;
    const orario = req.body.orario;
    const artista = req.body.artista;
    const capienza = req.body.capienza;

    logger.info(" Test Parametri:" + titolo + ", " + luogo + ", " + data + ", ecc...")

    //TODO: controlli sugli attributi dell'evento

    //Fase 1: creazione di un nuovo contratto Evento e deploy
    //Usare la json interface (attraverso l'abi)
    const fs = require('fs');
    const obj = JSON.parse(fs.readFileSync('../build/contracts/Evento.json', 'utf8'));
    const eventoInterface = obj['abi'];
    const Contract = require('web3-eth-contract');
    Contract.setProvider('http://127.0.0.1:22000');

    let nuovoEvento = new Contract(eventoInterface);

    //Prende il bytecode del contratto "Evento"
    await nuovoEvento.deploy({
        data: obj['bytecode'],

        arguments: null
    }).send({
        from: req.session.user.account
    }).then((instance) => {
        global.e_savedAddress = instance.options.address;
        logger.info("Contract mined at " + e_savedAddress);
    });


    //Fase 2: storeItem degli attributi dell'evento

    const eventoService = await EventoService.getInstance({
        account: req.session.user.account,
        host: 'http://localhost:22000',
        address: e_savedAddress
    });

    const evento_info = await eventoService.storeItem(id, titolo, luogo, data, orario, artista, capienza);

    //Fase 3: inserimento dell'address del contratto Evento nel DB

    await database.query({
        query: "INSERT INTO contract (name, address, id_evento) VALUES ('evento', ?, ?)",
        values: [e_savedAddress, id]
    }, function (err, result) {
        if (err) throw err;
    }).then(result => {
        global.eventId = result[0];
        logger.info("1 record inserted, ID:" + eventId);
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });

    //Fase 4: creazione e deploy del contratto Biglietti associato all'evento appena creato

    const biglietti_obj = JSON.parse(fs.readFileSync('../build/contracts/Biglietti.json', 'utf8'));
    const bigliettiInterface = biglietti_obj['abi'];
    const newBiglietti = new Contract(bigliettiInterface);

    await newBiglietti.deploy({
        data: biglietti_obj['bytecode'],

        //address del contratto Evento creato in precedenza, va in input al costruttore di Biglietti
        arguments: [e_savedAddress]
    }).send({
        from: req.session.user.account
    }).then((instance) => {
        global.b_savedAddress = instance.options.address;
        logger.info("Contract mined at " + b_savedAddress);
    });

    //Fase 5: inserimento dell'address del nuovo contratto Biglietti sul DB

    let nome_contratto = 'biglietti_evento_' + global.eventId;
    logger.info('Inserendo: ' + nome_contratto);
    await database.query({
        query: "INSERT INTO contract (name, address, id_evento) VALUES (?, ?, ?)",
        values: [nome_contratto, b_savedAddress, id]
    }, function (err, result) {
        if (err) throw err;
        logger.info("1 record inserted, ID:" + result.insertId);
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });

    req.flash('success', 'Evento creato.');
    return res.redirect('/');
});

router.get("/id/:id/invalidaBiglietto/id/:id_biglietto", isLoggedIn, isInvalidator, async (req, res) => {

    const id_evento = req.params.id;
    const id_biglietto = req.params.id_biglietto;

    await database.query({
        query: 'SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?',
        values: ['biglietti_evento_%', id_evento]
    }, function (err) {
        if (err) throw err;
    }).then(async result => {
        result = Object.values(JSON.parse(JSON.stringify(result)));

        if (result.length !== 0) {
            // get an instance of the tickets
            const bigliettiSevice = await BigliettiService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0][0].address
            });

            // invalidate the ticket
            const ticket_info = await bigliettiSevice.setInvalidatoBiglietto(id_biglietto);

            req.flash('success', 'Biglietto invalidato correttamente.');
        } else {
            req.flash('error', 'ERRORE, contratto biglietti non trovato.');
        }

        return res.redirect('/');
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });
    ;
});

router.get("/id/:id/annullaBiglietto/id/:id_biglietto", isLoggedIn, isAdmin, async (req, res) => {

    const id_evento = req.params.id;
    const id_biglietto = req.params.id_biglietto;

    // check if the state of the event is 'Annullato'
    await database.query({
        query: 'SELECT * FROM contract WHERE lower(name) = ? AND id_evento = ?',
        values: ['evento', id_evento]
    }, function (err) {
        if (err) throw err;
    }).then(async result => {
        result = Object.values(JSON.parse(JSON.stringify(result)));

        if (result.length !== 0) {
            // get an instance of the tickets
            const eventoService = await EventoService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0][0].address
            });

            // get the state of the event
            const stato_evento = await eventoService.getStato();

            if (stato_evento !== 'Annullato') {
                req.flash('error', 'ERRORE, si possono annullare soltanto i biglietti degli eventi con stato \'Annullato\'.');
                return res.redirect('/');
            } else {
                // set the state of the ticket as cancelled
                await database.query({
                    query: 'SELECT * FROM contract WHERE lower(name) like ? AND id_evento = ?',
                    values: ['biglietti_evento_%', id_evento]
                }, function (err) {
                    if (err) throw err;
                }).then(async result => {
                    result = Object.values(JSON.parse(JSON.stringify(result)));
                    if (result.length !== 0) {
                        // get an instance of the tickets
                        const bigliettiSevice = await BigliettiService.getInstance({
                            // user account address
                            account: req.session.user.account,
                            // host URL
                            host: 'http://localhost:22000',
                            // contract account address
                            address: result[0][0].address
                        });

                        // cancelled the ticket
                        const ticket_info = await bigliettiSevice.setAnnulatoBiglietto(id_biglietto);

                        req.flash('success', 'Biglietto annullato correttamente.');
                    } else {
                        req.flash('error', 'ERRORE, contratto biglietti non trovato.');
                    }

                    return res.redirect('/');
                });
            }
        } else {
            req.flash('error', 'ERRORE, contratto evento non trovato.');
            return res.redirect('/');
        }
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });
    ;
});

router.get("/id/:id/concludiEvento", isLoggedIn, isAdmin, async (req, res) => {

    const id_evento = req.params.id;

    await database.query({
        query: 'SELECT * FROM contract WHERE lower(name) = ? AND id_evento = ?',
        values: ['evento', id_evento]
    }, function (err) {
        if (err) throw err;
    }).then(async result => {
        result = Object.values(JSON.parse(JSON.stringify(result)));
        if (result.length !== 0) {
            // get an instance of the tickets
            const eventoService = await EventoService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0][0].address
            });

            // set evento as concluded
            const evento_info = await eventoService.setConclusoEvento();

            req.flash('success', 'Stato evento aggiornato a concluso correttamente.');
        } else {
            req.flash('error', 'ERRORE, contratto evento non trovato.');
        }

        return res.redirect('/');
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });
});

router.get("/id/:id/annullaEvento", isLoggedIn, isAdmin, async (req, res) => {
    const id_evento = req.params.id;

    await database.query({
        query: 'SELECT * FROM contract WHERE lower(name) = ? AND id_evento = ?',
        values: ['evento', id_evento]
    }, function (err) {
        if (err) throw err;
    }).then(async result => {
        result = Object.values(JSON.parse(JSON.stringify(result)));
        if (result.length !== 0) {
            // get an instance of the tickets
            const eventoService = await EventoService.getInstance({
                // user account address
                account: req.session.user.account,
                // host URL
                host: 'http://localhost:22000',
                // contract account address
                address: result[0][0].address
            });

            // set evento as cancelled
            const evento_info = await eventoService.setAnnulatoEvento();

            req.flash('success', 'Stato evento aggiornato ad annullato correttamente.');
        } else {
            req.flash('error', 'ERRORE, contratto evento non trovato.');
        }

        return res.redirect('/');
    }).catch(error => {
        error = {
            status: '500',
            stack: error,
            message: 'Errore Query'
        }

        return res.render("error", {title: 'Errore', error: error, user: req.session.user});
    });
});

module.exports = router;