const ContractService = require('./ContractService');
const Web3 = require('web3');

class EventoService extends ContractService {
    constructor(contractAddress, accountAddress, web3) {
        super('Evento', contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        const host = options.host ? options.host : 'http://localhost:22000';
        const web3 = new Web3(host);
        const accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        const contractAddress = options.address;
        return new EventoService(contractAddress, accountAddress, web3);
    }

    async getEvento() {
        return this.call(this.contract.methods.getEvento());
    }

    async storeItem(id, titolo, luogo, data, orario, artista, capienza) {
        const timestamp = new Date().toISOString();
        return this.send(this.contract.methods.storeItem(id, titolo, timestamp, luogo, data, orario, artista, capienza));
    }

    async getLuogo() {
        return this.call(this.contract.methods.getLuogo());
    }

    async getTitolo() {
        return this.call(this.contract.methods.getTitolo());
    }

    async getCapienza() {
        return this.call(this.contract.methods.getCapienza());
    }

    async getStato() {
        return this.call(this.contract.methods.getStatoEvento());
    }

    async getData() {
        return this.call(this.contract.methods.getData());
    }

    async getOrario() {
        return this.call(this.contract.methods.getOrario());
    }

    async getArtista() {
        return this.call(this.contract.methods.getArtista());
    }

}

module.exports = EventoService;
