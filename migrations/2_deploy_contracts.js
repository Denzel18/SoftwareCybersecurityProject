const Biglietti = artifacts.require('Biglietti');
const Evento = artifacts.require('Evento');
const Contract = require('../webapp/models/Contract.js');
//const Web3 = require('web3');
// const Sequelize = require("sequelize");


//const date = require('date-and-time');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

function storeDB(address1, address2) {
    const contratto_1 = Contract.create({name: 'Evento', address: address1});
    const contratto_2 = Contract.create({name: 'Biglietti', address: address2});
}

async function dropTable() {
    const drop = await Contract.drop();
}

module.exports = async function (deployer) {


    //const contratto_1 = Contract.create({name: 'EVENTO', address:  'Ox000000000000000000000000'}); //---> qui funziona 
    //let web3 = new Web3("http://localhost:22000");
    //let accounts = await web3.eth.getAccounts();

    dropTable();

    await deployer.deploy(Evento).then(async function () {
        await deployer.deploy(Biglietti, Evento.address).then(function () {
            storeDB(Evento.address, Biglietti.address);
            return Biglietti.address;
        });
    });

    let E_ = await Evento.deployed();
    let B_ = await Biglietti.deployed();


    console.log('Evento Address ' + E_.address);
    console.log('Biglietti Address ' + B_.address);
};
