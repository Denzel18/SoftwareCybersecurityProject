const BlockchainContractService = require("./blockchainservice");
const Contract = require("../models/Contract");
const Web3 = require("web3");

class venditaLogService extends BlockchainContractService {
    constructor(contractAddress, accountAddress, web3) {
        super("LogVendita", contractAddress, accountAddress, web3);
    }

    static async getInstance(options) {
        let contract = await Contract.findOne({ name: "LogVendita" });
        let host = options.host ? options.host : "http://localhost:22000";
        let web3 = new Web3(host);
        let accountAddress = options.account ? options.account : (await web3.eth.getAccounts())[0];
        return new venditaLogService(contract.address, accountAddress, web3);
    }

    async getLog() {
        let log = await this.call(this.contract.methods.getLog());
        return log;
    }

}

module.exports = venditaLogService;
