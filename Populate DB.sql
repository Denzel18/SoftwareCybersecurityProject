use cybersecurity;

INSERT into Users (id, name, username, password, account ,createdAt, updatedAt)
values ('4','denis rossi','denis@bernosssvchi.com','prova2','prova2','2010-10-10','2020-10-10'); 

INSERT into Users (id, name, username, password, account ,createdAt, updatedAt)
values ('1','denis bianchi','denis@bernosvchiiiii.com','prova2','prova2','2010-10-10','2020-10-10'); 

INSERT into Users (id, name, username, password, account ,createdAt, updatedAt) 
values ('2','denis verdi','denis@prova.com','$2a$10$hlrOeRncW/ut8w7dUqhmHuYSC1oHLr1PVtKvXrI7fUmapZJAKANKq','denisberno','2010-10-10','2020-10-10'); 

INSERT into Evento (id, titolo, createdAt, updatedAt) 
values ('2','titolo1','2010-10-10','2020-10-10'); 

INSERT into Evento (id, titolo, createdAt, updatedAt) 
values ('3','titolo2','2010-10-10','2020-10-10'); 


INSERT into Biglietto (id, id_evento, titolo, tipoBiglietto, createdAt, updatedAt) 
values ('1','2','concerto ligabue', 1,'2010-10-10','2020-10-10'); 
INSERT into Biglietto (id, id_evento, titolo, tipoBiglietto, createdAt, updatedAt) 
values ('2','2','concerto ligabue',1, '2010-10-10','2020-10-10'); 
INSERT into Biglietto (id, id_evento, titolo, tipoBiglietto, createdAt, updatedAt) 
values ('3','2','concerto ligabue', 1,'2010-10-10','2020-10-10'); 

INSERT into Biglietto (id, id_evento, titolo, tipoBiglietto, createdAt, updatedAt) 
values ('4','3','concerto vasco', 1,'2010-10-10','2020-10-10'); 
INSERT into Biglietto (id, id_evento, titolo, tipoBiglietto, createdAt, updatedAt) 
values ('5','3','concerto vasco', 1,'2010-10-10','2020-10-10'); 

INSERT into Contratto (id, name, address, createdAt, updatedAt) 
values (1,'Biglietti','0x4D3bfd7821E237fFE84209d8E638f9f309865b87','2010-10-10','2021-01-01'); 