const fs = require("fs");

class ContractService {
    constructor(contractName, contractAddress, account, web3) {
        try {
            const ContractFile = JSON.parse(fs.readFileSync(`../build/contracts/${contractName}.json`));
            this.contract = new web3.eth.Contract(ContractFile.abi, contractAddress);
            this.account = account;
        } catch (error) {
            const ContractFile = JSON.parse(fs.readFileSync(`build/contracts/${contractName}.json`));
            console.error('TRUFFLE');
            this.contract = new web3.eth.Contract(ContractFile.abi, contractAddress);
            this.account = account;
        }
        
        // const ContractFile = JSON.parse(fs.readFileSync(`../build/contracts/${contractName}.json`));
        
    }

    async call(method) {
        return method.call({from: this.account});
    }

    async send(method) {
        return method.send({from: this.account});
    }
}

module.exports = ContractService
