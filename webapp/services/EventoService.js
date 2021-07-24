const ContractService = require('./ContractService');
// const Contract = require('../models/Contract');
const Web3 = require('web3');

class EventoService extends ContractService {
    constructor(contractAddress, accountAddress, web3) {
        super('Evento', contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        // let contract = await Contract.findOne({ name: "Evento" });
        //let host = options.host ? options.host : "http://localhost:22000";
        let host = 'http://localhost:22000';
        let web3 = new Web3(host);
        //let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        let accountAddress = (await web3.eth.getAccounts())[0];
        // return new EventoService(contract.address, accountAddress, web3);
        return new EventoService('0xd9145CCE52D386f254917e481eB44e9943F39138', accountAddress, web3);
    }

    async getEvento() {
        return await this.call(this.contract.methods.getEvento());
    }

    async storeItem(id, titolo, luogo, data, orario, artista, capienza) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(id, timestamp, titolo, luogo, data, orario, artista, capienza));
    }

    async getLuogo() {
        return await this.call(this.contract.methods.getLuogo());
    }

}

module.exports = EventoService;
