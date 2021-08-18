// Fase 1: creazione di un nuovo contratto Evento e deploy
// Usare la json interface (attraverso l'abi)
const ContractModel = require('./models/Contract.js');
const Sequelize = require('sequelize');
const database = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
})
const fs = require('fs');
const obj = JSON.parse(fs.readFileSync('../build/contracts/Evento.json', 'utf8'));
const eventoInterface = obj['abi'];
const Contract = require('web3-eth-contract');
const EventoService = require('./services/EventoService');
Contract.setProvider('http://127.0.0.1:22000');

let nuovoEvento = new Contract(eventoInterface);

async function dropTable() {
    const drop = await ContractModel.drop();
}

dropTable();

// Prende il bytecode del contratto "Evento"
nuovoEvento.deploy({
    data: obj['bytecode'],
    arguments: null
}).send({
    from: '0xed9d02e382b34818e88b88a309c7fe71e65f419d'
}).then(async (instance) => {
    e_savedAddress = instance.options.address;
    //Fase 2: storeItem degli attributi dell'evento

    const eventoService = await EventoService.getInstance({
        account: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
        host: 'http://localhost:22000',
        address: e_savedAddress
    });

    const evento_info = eventoService.storeItem(0, 'Concerto A', 'Ancona', '05/11/2022', '12:00', 'Artista B', 300);

//Fase 3: inserimento dell'address del contratto Evento nel DB

    database.query({
        query: "INSERT INTO contract (name, address, id_evento) VALUES ('evento', ?, ?)",
        values: [e_savedAddress, 0]
    }, function (err, result) {
        if (err) throw err;
    }).then(result => {
        global.eventId = result[0];
    }).catch(error => {
        console.log(error);
    });

//Fase 4: creazione e deploy del contratto Biglietti associato all'evento appena creato

    const biglietti_obj = JSON.parse(fs.readFileSync('../build/contracts/Biglietti.json', 'utf8'));
    const bigliettiInterface = biglietti_obj['abi'];
    const newBiglietti = new Contract(bigliettiInterface);

    newBiglietti.deploy({
        data: biglietti_obj['bytecode'],
        //address del contratto Evento creato in precedenza, va in input al costruttore di Biglietti
        arguments: [e_savedAddress]
    }).send({
        from: '0xed9d02e382b34818e88b88a309c7fe71e65f419d'
    }).then((instance) => {
        b_savedAddress = instance.options.address;
        //Fase 5: inserimento dell'address del nuovo contratto Biglietti sul DB

        let nome_contratto = 'biglietti_evento_' + global.eventId;
        database.query({
            query: "INSERT INTO contract (name, address, id_evento) VALUES (?, ?, ?)",
            values: [nome_contratto, b_savedAddress, 0]
        }, function (err, result) {
            if (err) throw err;
        }).catch(error => {
            console.log(error);
        });
    });
});


