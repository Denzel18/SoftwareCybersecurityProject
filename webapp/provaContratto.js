const Contract = require('web3-eth-contract');


jsonInterface = [
	{
		"inputs": [],
		"name": "setAnnulatoEvento",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setConclusoEvento",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "titolo_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "timestamp_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "luogo_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "data_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "orario_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "artista_",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "capienza_",
				"type": "uint256"
			}
		],
		"name": "storeItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "evento",
		"outputs": [
			{
				"internalType": "contract Evento",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCapienza",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEvento",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLuogo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStatoEvento",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isAnnulatoEvento",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isAttivoEvento",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
address = '0x1932c48b2bF8102Ba33B4A6B545C32236e342f34';

Contract.setProvider('http://127.0.0.1:22000');

const contract = new Contract(jsonInterface, address);
// contract.defaultAccount = '0xed9d02e382b34818e88b88a309c7fe71e65f419d';

contract.methods.getCapienza().call({from: '0xed9d02e382b34818e88b88a309c7fe71e65f419d'})
.then(function(result) {
console.log(result);
});
