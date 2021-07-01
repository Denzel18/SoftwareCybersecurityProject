// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.7.1; 
pragma experimental ABIEncoderV2;
 
contract Evento  {
    address owner;
 
    enum StatoEvento  {attivo, annullato, concluso }
    
    uint id_evento;
    string titolo;
    string luogo;
    string data;
    string orario;
    string artista;
    string timestamp;
    uint capienza;
    StatoEvento stateEvento;

 

 
    constructor()  {
        owner = msg.sender;
        length = 0;
    }
 
    modifier restricted()  {
        if (msg.sender == owner) _; // TODO: verificare
    }
 

 
    Evento public evento;
 
    uint256 length;
 
    function storeItem(uint id_, string memory titolo_, string memory timestamp_, string memory luogo_, string memory data_, string memory orario_, string memory artista_, uint capienza_ ) public restricted  {
        id_evento = id_; 
        timestamp = timestamp_;
        titolo = titolo_; 
        luogo = luogo_;
        data = data_; 
        orario = orario_; 
        artista = artista_;
        capienza = capienza_;
        stateEvento = StatoEvento.attivo; 
     }
 
    function getEvento() public view returns (Evento) {
        return evento;
    }
 
    function isAnnulatoEvento() public view returns (bool) {
       if(Evento.stateEvento == StatoEvento.annullato){
            return true; 
        }else{
            return false;
        }
    }
    
 
    function setAnnulatoEvento() public restricted  {
        Evento.stateEvento = StatoEvento.annullato;
    }
 
    
 
    function setConclusoEvento() public restricted  {
        Evento.stateEvento = StatoEvento.concluso;
    }
 
}
 
