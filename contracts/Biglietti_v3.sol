// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;
import "prova/contracts/GiornaleEventi.sol";


contract Biglietti{

    address owner;
    
    Evento evento_;
    
    /*creato = senza sigillo, valido = con sigillo, annullato = evento annullato, invalidato = biglietto utilizzato*/
     
    enum StatoBiglietto {creato, valido, annullato, invalidato}
    enum TipologiaBiglietto {tipologia1, tipologia2, tipologia3}

    struct Biglietto {
        uint id;
        TipologiaBiglietto typeb;
        string timestamp;
        string prezzo;
        string cod_sigillo;
        StatoBiglietto state;
    }

    
    //constructor() {
    //    owner = msg.sender;
    //    length = 0;
    //}
    
    constructor(Evento _evento_) {
        evento_ = _evento_;
        //id_evento = evento_.id_evento;
        owner = msg.sender;
        length = 0;
    }
    
    
    //Sembra utile per la sicurezza, metodi changeStato 
    modifier restricted() {
        if (msg.sender == owner) _; // TODO: verificare
    }

    Biglietto[] public lista_biglietti;

    uint256 length;

    function storeItem(string memory timestamp, string memory prezzo, TipologiaBiglietto tipoBiglietto, StatoBiglietto statoBiglietto) public restricted {
        lista_biglietti.push(Biglietto({
            id: length,
            state: statoBiglietto,
            timestamp: timestamp,
            prezzo: prezzo, 
            cod_sigillo: "0",
            typeb: tipoBiglietto
        }));
        length++;
    }
    
    function setValidoBiglietto(uint id,string memory cod_sigillo) public restricted {
        lista_biglietti[id].cod_sigillo = cod_sigillo; 
        lista_biglietti[id].state = StatoBiglietto.valido;
    }
    
    function setAnnulatoBiglietto(uint id) public restricted {
        assert(evento_.isAnnulatoEvento());
        lista_biglietti[id].state = StatoBiglietto.annullato;
    }
    
    function setInvalidatoBiglietto(uint id) public restricted {
        lista_biglietti[id].state = StatoBiglietto.invalidato;
    }

    function getGiornale() public view returns (Biglietto[] memory){
        return lista_biglietti;
    }

    function getLength() public view returns (uint256){
        return length;
    }
    
    
    /* NON SAPPIAMO SE SERVE */ 
    //function getBigliettoFromHash
    
    
    
}
