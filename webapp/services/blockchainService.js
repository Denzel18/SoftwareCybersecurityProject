
const fs = require("fs");

class BlockchainContractService {
    constructor(contract, contractAddress, account, web3) {
        const ContractFile = JSON.parse(fs.readFileSync(`../build/contracts/${contract}.json`));
        this.contract = new web3.eth.Contract(ContractFile.abi, contractAddress);
        this.account = account;
    }

    async call(method) {
        return method.call({ from: this.account });
    }

    async send(method) {
        return method.send({ from: this.account });
    }
}

module.exports = BlockchainContractService