// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;
import "./Evento.sol";


contract Biglietti{

    address owner;
    address eventoAddress; 

    
    /*creato = senza sigillo, valido = con sigillo, annullato = evento annullato, invalidato = biglietto utilizzato*/
     
    enum StatoBiglietto {creato, valido, annullato, invalidato}
    enum TipologiaBiglietto {tipologia1, tipologia2, tipologia3}
    
    event Validato (string cod_sigillo, string evento, string prezzo);

    struct Biglietto {
        uint id;
        TipologiaBiglietto typeb;
        string timestamp;
        string prezzo;
        string cod_sigillo;
        StatoBiglietto state;
    }

    
    constructor(address eventoAddress_) public {
        eventoAddress = eventoAddress_;
        //id_evento = evento_.id_evento;
        owner = msg.sender;
        length = 0;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    Biglietto[] public lista_biglietti;

    uint256 length;

    function storeItem(string memory timestamp, string memory prezzo, TipologiaBiglietto tipoBiglietto) public restricted { 
        if(getPostiRimanenti() > 0) {
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
    } //TODO: cosa fare in caso di posti insufficienti? 
    
    function setValidoBiglietto(uint id) public restricted {
        lista_biglietti[id].state = StatoBiglietto.valido;
        Evento evento = Evento(eventoAddress);
        string memory nome_evento = evento.getTitolo();
        emit Validato(this.getSigillo(id), nome_evento, this.getPrezzo(id));
    }
    
    
    function getEventoInfo() public view returns (string memory){
        Evento evento = Evento(eventoAddress);
        return evento.getStatoEvento(); 
    }
    
    function setAnnulatoBiglietto(uint id) public restricted  {
        Evento evento = Evento(eventoAddress);
        if(evento.isAnnulatoEvento() == true){
            lista_biglietti[id].state = StatoBiglietto.annullato;
        }
    }
    
    function setInvalidatoBiglietto(uint id) public restricted {
        Evento evento = Evento(eventoAddress);
        if(evento.isAttivoEvento() == true){
            lista_biglietti[id].state = StatoBiglietto.invalidato;
        }
    }

    function getGiornale() public view returns (Biglietto[] memory){
        return lista_biglietti;
    }

    function getLength() public view returns (uint){
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
    
    function statusPagamento(string memory codiceTransazione) public restricted view returns (bool){
        string memory OK = "OK"; 
        if (keccak256(abi.encodePacked(codiceTransazione)) == keccak256(abi.encodePacked(OK))) {
            return true; 
        }else{
            return false; 
        }
    }
    
    function getPostiRimanenti() public view returns (uint256) {
        Evento evento = Evento(eventoAddress);
        uint256 totali = evento.getCapienza();
        uint256 rimanenti = totali - Biglietti.getLength();
        return rimanenti;
    }
    
    function getPrezzo(uint id) public view returns (string memory) {
        return lista_biglietti[id].prezzo;
    }
}
