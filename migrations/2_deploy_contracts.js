const Biglietti = artifacts.require('Biglietti');
const Evento = artifacts.require('Evento');
// const Contract = require('../webapp/models/Contract.js');
const Web3 = require('web3');

module.exports = async function (deployer) {
    //let web3 = new Web3("http://localhost:22000");
    //let accounts = await web3.eth.getAccounts();

    // await Contract.deleteMany({});

    //await deployer.deploy(Evento, accounts[0]);
    await deployer.deploy(Evento);
    await deployer.deploy(Biglietti, Evento.address);
    // let EVN = await Evento.deployed();
    // let BTT = await Biglietti.deployed();

    // let contracts = [{
    //     name: "Biglietti",
    //     address: BTT.address
    // }, {
    //     name: "Evento",
    //     address: EVN.address
    // }];

    //await Contract.insertMany(contracts);
};
