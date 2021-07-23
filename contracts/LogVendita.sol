/ SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;

contract LogVendita {
    
    address owner;

   //Cosa tracciamo di una vendita?
    struct LogItem {
        uint id;
        string evento;
        address caller;
        string timestamp;
        string costo;
        string cod_sigillo; //Da mettere?
        
        // 0 = ERROR, 1 = SUCCESS; Attualmente tolto anche dalla storeItem
        //uint result;
    }
    
    LogItem[] public log_vendite;

    uint256 length;
    
    constructor() public {
        owner = msg.sender;
        length = 0;
    }


    modifier restricted() {
        if (msg.sender == owner) _;
    }


    function storeItem(string memory timestamp, string memory evento, string memory costo, string cod_sigillo) public restricted {
        log_vendite.push(LogItem({
            id: length,
            evento: evento,
            caller: msg.sender,
            timestamp: timestamp,
            costo:costo,
            cod_sigillo:cod_sigillo
        }));
        length++;

        
    }
    
    function getLog() public view returns (LogItem[] memory){
        return log_vendite;
    }

    
    function getLength() public view returns (uint256){
        return length;
    }
}
    
    
    
}