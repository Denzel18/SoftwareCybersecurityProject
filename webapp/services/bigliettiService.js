const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class bigliettiService extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("Biglietto", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "Biglietti" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new bigliettiService(contract.address, accountAddress, web3);
    }

    async storeItem(timestamp, prezzo, tipoBiglietto) {
        return this.send(this.contract.methods.storeItem(timestamp, prezzo, tipoBiglietto));
    }

    async setValidoBiglietto (id){
        return this.send(this.contract.methods.setValidoBiglietto(id));
    }

    async getEventoInfo(){
        return this.send(this.contract.methods.getEventoInfo());
    }
    
    async setAnnulatoBiglietto (id){
        return this.send(this.contract.methods.setAnnulatoBiglietto(id));
    }

    async setInvalidatoBiglietto (id){
        return this.send(this.contract.methods.setInvalidatoBiglietto(id));
    }
    
    async getBiglietti() {
        let biglietti = await this.call(this.contract.methods.getGiornale());
        return biglietti;
    }

    async getLength(){
        return this.send(this.contract.methods.getLength());
    }
    
    async setSigillo(id, sigillo,codiceTransazione){
        return this.send(this.contract.methods.setSigillo(id,sigillo, codiceTransazione));
    }
    
    async getSigillo(id){
        return this.send(this.contract.methods.getSigillo(id));
    }
    
    async getTipoBiglietto(id){
        return this.send(this.contract.methods.getTipoBiglietto(id));
    }

    async getPostiRimanenti(id){
        return this.send(this.contract.methods.getPostiRimanenti());
    }

    async statusPagamento(codiceTransazione){
        return this.send(this.contract.methods.statusPagamento(codiceTransazione));
    }
}

module.exports = bigliettiService;
