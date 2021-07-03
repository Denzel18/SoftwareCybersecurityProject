// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;
import "./Evento.sol";


contract Biglietti{

    address owner;
    Evento evento;
    
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

    
    constructor(Evento evento_) {
        evento = evento_;
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

    function storeItem(string memory timestamp, string memory prezzo, TipologiaBiglietto tipoBiglietto) public restricted {
        lista_biglietti.push(Biglietto({
            id: length,
            state: StatoBiglietto.creato,
            timestamp: timestamp,
            prezzo: prezzo, 
            cod_sigillo: "0",
            typeb: tipoBiglietto
        }));
        length++;
    }
    
    function setValidoBiglietto(uint id) public restricted {
        lista_biglietti[id].state = StatoBiglietto.valido;
    }
    
    
    function getEventoInfo() public view returns (string memory){
        return evento.getStatoEvento(); 
    }
    
    function setAnnulatoBiglietto(uint id) public {// provare senza restricted public restricted
        if(evento.isAnnulatoEvento() == true)
            lista_biglietti[id].state = StatoBiglietto.annullato;
        //assert(evento_.isAnnulatoEvento());
        
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
    function getId(uint posx) public view returns (uint){
        return  lista_biglietti[posx].id; 
    }
    
    function setSigillo(uint id, string memory sigillo,string memory codiceTransazione) public restricted {
        if(statusPagamento(codiceTransazione) == true){
            lista_biglietti[id].cod_sigillo = sigillo; 
            setValidoBiglietto(id);
        }

    }
    
    function getSigillo(uint id) public view returns (string memory) {
        return lista_biglietti[id].cod_sigillo; 
    }
    
    function getTipoBiglietto(uint id) public view returns (string memory) {
        if(lista_biglietti[id].typeb == TipologiaBiglietto.tipologia1){
            return "Tipologia 1";
        }else if(lista_biglietti[id].typeb == TipologiaBiglietto.tipologia2){
            return "Tipologia 2";
        }else{
            return "Tipologia 3";
        }
    }
    
    function statusPagamento(string memory codiceTransazione) public view returns (bool){
        string memory OK = "OK"; 
        if (keccak256(abi.encodePacked(codiceTransazione)) == keccak256(abi.encodePacked(OK))) {
            return true; 
        }else{
            return false; 
        }
    }
    
    /*
    0x0000000000000000000000000000000000000000
    */
    
    
}
