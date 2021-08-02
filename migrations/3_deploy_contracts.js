const Biglietti = artifacts.require('Biglietti');
const Evento = artifacts.require('Evento');
const Contract = require('../webapp/models/Contract.js');
const EventoService = require('../webapp/services/EventoService.js');

const Web3 = require('web3');
const web3 = new Web3('http://localhost:22000');

function storeDB(id1, name1, address1, id2, name2, address2) {
    const contratto_1 = Contract.create({id: id1, name: name1, address: address1});
    const contratto_2 = Contract.create({id: id2, name: name2 + id1, address: address2});
}

module.exports = async function (deployer) {

    await deployer.deploy(Evento).then(async function () {
        await deployer.deploy(Biglietti, Evento.address).then(function () {
            storeDB(3, "evento", Evento.address, 4, "biglietti_evento_", Biglietti.address);
        });
    });

    const E_ = await Evento.deployed();
    const B_ = await Biglietti.deployed();

    const EventoService_ = await EventoService.getInstance({
        account: (await web3.eth.getAccounts())[0],
        // account: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
        host: 'http://localhost:22000',
        address: E_.address
    });

    const evento_info = await EventoService_.storeItem(1001, 'Concerto X', 'Macerata', '20/12/2022', '21:00', 'Artista Y', 1500);
    const evento_info_1 = await EventoService_.storeItem(1002, 'Concerto X', 'Macerata', '20/12/2022', '21:00', 'Artista Y', 1500);
     

    

    console.log('Evento2 Address ' + E_.address);
    console.log('Biglietti2 Address ' + B_.address);

    console.log('Evento Creato : '+evento_info.titolo)
};
