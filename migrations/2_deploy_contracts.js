const Biglietti = artifacts.require('Biglietti');
const Evento = artifacts.require('Evento');
const Contract = require('../webapp/models/Contract.js');
const EventoService = require('../webapp/services/EventoService.js');

const Web3 = require('web3');
const web3 = new Web3('http://localhost:22000');

function storeDB(id1, name1, address1, id2, name2, address2) {
    const contratto_1 = Contract.create({id: id1, name: name1, address: address1, id_evento: 0});
    const contratto_2 = Contract.create({id: id2, name: name2 + id1, address: address2, id_evento: 0});
}

async function dropTable() {
    const drop = await Contract.drop();
}

async function storeItem(EventoService_) {
    await EventoService_.storeItem(0, 'Concerto A', 'Ancona', '05/11/2022', '12:00', 'Artista B', 300).then(result => {
        console.log('Evento Creato : ' + result.titolo);
    });
}

module.exports = async function (deployer) {

    dropTable();

    await deployer.deploy(Evento).then(async function () {
        await deployer.deploy(Biglietti, Evento.address).then(function () {
            storeDB(1, 'evento', Evento.address, 2, 'biglietti_evento_', Biglietti.address);
        });
    });

    const E_ = await Evento.deployed();
    const B_ = await Biglietti.deployed();

    const EventoService_ = await EventoService.getInstance({
        account: (await web3.eth.getAccounts())[0],
        host: 'http://localhost:22000',
        address: E_.address
    });

    storeItem(EventoService_);

    console.log('Evento1 Address ' + E_.address);
    console.log('Biglietti1 Address ' + B_.address);


};
