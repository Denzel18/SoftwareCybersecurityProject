const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class eventoService  extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("Evento", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "Evento" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new GDLService(contract.address, accountAddress, web3);
    }

    async getEvento() {
        let evento = await this.call(this.contract.methods.getEvento());
        return evento;
    }

    async storeItem(id_, titolo_, luogo_, data_, orario_, artista_,  capienza_) {
        let timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(id_, titolo_, timestamp, luogo_, data_, orario_, artista_,  capienza_));
    }
    
}

module.exports = eventoService;
