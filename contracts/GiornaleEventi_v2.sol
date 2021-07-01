// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;
 
contract GiornaleEventi  {
    address owner;
 
    enum StatoEvento  {attivo, annullato, concluso }
    
    struct EventoItem {
        uint id_evento;
        string titolo;
        string luogo;
        string data;
        string orario;
        string artista;
        string timestamp;
        uint capienza;
        StatoEvento stateEvento;
    }
 

 
    constructor()  {
        owner = msg.sender;
        length = 0;
    }
 
    modifier restricted()  {
        if (msg.sender == owner) _; // TODO: verificare
    }
 

 
    EventoItem[] public evento;
 
    uint256 length;
 
    function storeItem(string memory titolo, string memory timestamp, string memory luogo, string memory data, string memory orario, string memory artista, uint capienza ) public restricted  {
        evento.push(EventoItem({
            id_evento: length,
            timestamp: timestamp,
            titolo: titolo, 
            luogo: luogo, 
            data: data, 
            orario: orario, 
            artista: artista, 
            capienza: capienza, 
            stateEvento: StatoEvento.attivo
        }));
        length++;
     }
 
    
 
    
 
    function getGiornale() public view returns (EventoItem[] memory) {
        return evento;
     }
 
    
 
    function getLength() public view returns (uint256) {
        return length;
     }
 
    
    function isAnnulatoEvento(uint id) public view returns (bool) {
        if(evento[id].stateEvento == StatoEvento.annullato){
            return true; 
        }else{
            return false;
        }
    }
 
    
 
    function setAnnulatoEvento(uint id) public restricted  {
        //assert(evento.StatoEvento.annullato); 
        evento[id].stateEvento = StatoEvento.annullato;
    }
 
    
 
    function setConclusoEvento(uint id) public restricted  {
        //assert(evento.StatoEvento.attivo);
        evento[id].stateEvento = StatoEvento.concluso;
    }
 
}
 
