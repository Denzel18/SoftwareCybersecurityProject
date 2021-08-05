[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/emanueleincicco/SoftwareCybersecurityProject/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/emanueleincicco/SoftwareCybersecurityProject/network/members
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/emanueleincicco/SoftwareCybersecurityProject/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/emanueleincicco/SoftwareCybersecurityProject/">
    <img src="logounivpm.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">SoftwareCybersecurityProject</h3>
</p>


<!-- ABOUT THE PROJECT -->
## About The Project

Il progetto ha come obbiettivo la realizzazione di una biglietteria per eventi utilizzando la tecnologia Blockchain

### Built With

L'applicazione è stata sviluppata attraverso diversi tool: 
* [Bootstrap](https://getbootstrap.com)
* [Express JS](https://expressjs.com)
* [Node JS](https://nodejs.org/en/)
* [Ethereum](https://ethereum.org/en/)
* [My SQL](https://www.mysql.com)
* [Sequelize](https://sequelize.org/)
* [ETC](www.google.com)
* [*bcrypt*](https://it.wikipedia.org/wiki/Bcrypt)
* [*Quorum*](https://www.goquorum.com/)
* [*Truffle*](https://www.trufflesuite.com/)


## Getting Started

Tutti i pacchetti e le librerie necessari all'avvio dell'applicazione sono contenuti in *package.json*. Sarà sufficiente accedere alla directory *SoftwareCybersecurityProject* e lanciare il comando
```bash
npm install 
```
NB: Assicurarci che il pacchetto NPM sia installato correttamente
```bash
npm -version
```

## MySQL 

Al fine di memorizzare in modo persistente i dati relativi agli utenti e ai eventi passati, abbiamo utilizzato il DBMS **MySQL** attraverso il pacchetto **Sequelize**, mantenendo così i dati in modo affidabile e persistente. I dati sensibili come le password delle utente sono state salvate in modo criptato tramite  [*bcrypt*](https://it.wikipedia.org/wiki/Bcrypt). 

## Quorum

Il core del nostro progetto è la blockchain [*Quorum*](https://www.goquorum.com/). Per poter utilizzare la web app, è necessario avviare la blockchain in locale. È possibile farlo facilmente tramite [quorum-wizard](https://github.com/jpmorganchase/quorum-wizard), realizzato direttamente da **J.P. Morgan**. Le dipendenze sono *Node.js*, *npm* e *openjdk-11-jre*. Nel caso del progetto è stata usata una blockchain semplice composta da 3 nodi, generata tramite il tool.

```bash
npx quorum-wizard 
cd /network/<nome-della-rete>
./start 
./stop
```

## Truffle

Per effettuare il *deploy* dei contratti sulla blockchain *Quorum* abbiamo utilizzato [*Truffle*](https://www.trufflesuite.com/) nella versione 4.1.16. Risultano però presenti alcuni bug che impediscono il corretto funzionamento costantantemente. In caso di problematiche eseguire 

```bash
rm -r build/   
truffle migrate --reset 
```

## Step by Step 

1. **Installare Node.js** con il comando `sudo apt install nodejs`
2. **Creare la rete Quorum** 
	- Eseguire il comando `npx quorum-wizard`
	- Seguire la procedura guidata *Quickstart* per creare la blockchain
	- Avviare la blockchain con `./start.sh` dentro la cartella della rete precedentemente creta (per la procedura *Quickstart* la cartella di default è `/home/UTENTE/network/3-nodes-quickstart`)
3. **Installare e configurare MySQL**
	- Eseguire il comando `sudo apt install mysql-server` per installare MySQL server
	- Create un nuovo utente MySQL con le seguenti informazioni: 
		- **username: user** 
		- **password: user**
4. Eseguire `npm install` per **installare le dipendenze** del progetto
5. Eseguire `node create_database.js` dentro la cartella *webapp* per **creare il DB** utilizzato dalla webapp
6. Eseguire `truffle migrate --reset` dentro la root della repository per **effettuare il deploy dei contratti**
	- ATT: Assicurarsi che il deploy di Truffle sia effettivamente avvenuto (viene restituita la console dal comando precedentemente lanciato), altrimenti premere Ctrl + C e riprovare.  
7. Eseguire `npm start` dentro la cartella *webapp* per **avviare l'applicazione WEB**
8. Eseguire `node  insert_user.js` dentro la cartella *webapp* per **aggiungere gli utenti** di default
9. **Enjoy the webapp!**

## Tipologie di utenti e loro funzioni

- **Tipologia *utenti non registrati***, l'unica azione che possono effettuare gli utenti non registrati che accedono alla webapp è la registrazione, attraverso questa potranno poi compiere le azioni degli *user*.
- **Tipologia *user***, sono gli utenti base della webapp, gli utenti che utilizzano l'applicazione web per consultare le informazioni degli eventi (come i posti ancora disponibili, l'orario, ecc.) ed acquistare biglietti.
- **Tipologia *invalidator***, sono gli utenti che hanno il compito di invalidare il biglietto degli *user* all'ingresso degli eventi. Possono consultare la lista dei biglietti venduti per ciascun evento.
- **Tipologia *admin***, sono gli event manager, possono creare nuovi eventi, settare a concluso o annullato lo stato di un evento, consultare la lista dei biglietti venduti per ciascun evento, annullare i biglietti degli *user*.

## Interfacce WEB 

* [*APP*](http://localhost:3000)
* [*RETE*](http://localhost:8999)

## Relazione 

La [relazione](https://github.com/) è visionabile, per ulteriori dettagli implementativi e di progettazione 


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)






