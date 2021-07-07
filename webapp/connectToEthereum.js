const Web3 = require('web3');
/** NODE ADDRESS */
const provider = 'http://127.0.0.1:22000';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);


// get accounts and then get first account balance
web3.eth.getAccounts().then((result) => {
    console.log('Accounts: ', result);
    web3.eth.getBalance(result[0]).then((result) => {
        console.log('Balance of the first account: ', result, 'ETH');
    });
});


// get latest block
web3.eth.getBlockNumber().then((result) => {
    console.log('Latest Ethereum Block is ', result);
});
