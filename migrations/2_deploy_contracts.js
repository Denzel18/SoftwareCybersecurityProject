let Biglietti = artifacts.require("./Biglietti.sol");
let Evento = artifacts.require("./Evento.sol");
const Web3 = require("web3");

module.exports = async function (deployer) {
    let web3 = new Web3("http://localhost:22000");
    let accounts = await web3.eth.getAccounts();

    //await Contract.deleteMany({});

    //await deployer.deploy(ImageStorage, accounts[0]);

    await deployer.deploy(Evento);
    await deployer.deploy(Biglietti, Evento.address);
    let EVN = await Evento.deployed();
    let BTT = await Biglietti.deployed();

    let contracts = [{
        name: "Biglietti",
        address: BTT.address
    }, {
        name: "Evento",
        address: EVN.address
    }];

    //await Contract.insertMany(contracts);
};



// let Biglietti = artifacts.require("./Biglietti.sol");
// let Evento = artifacts.require("./Evento.sol");
// const Web3 = require("web3");
// const Contract = require("../webapp/models/Contract");
// const config = require("../webapp/config");
// const Sequelize = require("sequelize");

// module.exports = async (deployer) => {
//   let web3 = new Web3("http://localhost:22001");
//   let accounts = await web3.eth.getAccounts();
//   console.log(accounts);

//   const database = new Sequelize('cybersecurity', 'user', 'user', {
//     dialect: 'mysql',
//     host: "localhost",
//     port: 3306,
//   })

// //   database.query("TRUNCATE TABLE Contract'", {type: database.QueryTypes.TRUNCATE}).then(results=>{
// //     console.log(results);
// //     });

//   await Contract.deleteMany({});
//   await deployer.deploy(Evento,accounts[0]);
//   await deployer.deploy(Biglietti, Evento.address, accounts[0]);
  
//   let EE = await Evento.deployed();
//   let EB = await Biglietti.deployed();
  

// //   let contracts = [{
// //     name: "Evento",
// //     address: EE.address
// //   }, {
// //     name: "Biglietti",
// //     address: EB.address
// //   }];

// //   await Contract.insertMany(contracts);
  
//   console.log("INDIRIZZO EVENTO : " + EE.address)
//   console.log("INDIRIZZO BIGLIETTI : " + EB.address)
// };