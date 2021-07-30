const Biglietti = artifacts.require('Biglietti');
const Evento = artifacts.require('Evento');
const Contract = require('../webapp/models/Contract.js');

//const Web3 = require('web3');

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

    console.log('Evento2 Address ' + E_.address);
    console.log('Biglietti2 Address ' + B_.address);
};
