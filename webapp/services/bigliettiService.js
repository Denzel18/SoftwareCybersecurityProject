const ContractService = require('./ContractService');
const Contract = require("../models/Contract");
const Web3 = require("web3");
const createTaxSeal = require("../utils/TaxSealCreation")

class bigliettiService extends ContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("Biglietti", contractAddress, accountAddress, web3);
    }
    static async getInstance(options) {
        // let contract = await Contract.findOne({ name: "Biglietti" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0]; // questo restituisce  denisberno e non l'indirizzo
        console.log('results - Account Address : '+accountAddress );
        // console.log('results - Contract : '+contract );
        // console.log('contract address : '+ contract.address);
        //return new bigliettiService(contract.address, accountAddress, web3);
        return new bigliettiService(options.address, '0xed9d02e382b34818e88B88a309c7fe71E65f419d', web3); // node connectToEthereum.js [indirizzo]
    }

    async storeItem(timestamp, sigillo, prezzo, tipoBiglietto) {
        return this.send(this.contract.methods.storeItem(timestamp, sigillo, prezzo, tipoBiglietto));
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
        return this.call(this.contract.methods.getGiornale());
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

    async getPostiRimanenti(){
        return this.call(this.contract.methods.getPostiRimanenti());
    }

    async statusPagamento(codiceTransazione){
        return this.send(this.contract.methods.statusPagamento(codiceTransazione));
    }
}
module.exports = bigliettiService;
