

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

Per effettuare la compilazione e il *deploy* dei contratti sulla blockchain *Quorum* abbiamo utilizzato [*Truffle*](https://www.trufflesuite.com/) nella versione 4.1.16. 
Il deploy dei contratti di default attraverso Truffle è stato utilizzato soltanto in fase di sviluppo, evitandolo poi nel rilascio, in quanto erano presenti alcuni bug che impedivano il corretto funzionamento ad ogni esecuzione della webapp. Per effettuare il deploy del contratto di default è stato realizzato un file JS a parte, come descritto nei passi seguenti.

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
6. Eseguire `truffle migrate --reset` dentro la root della repository per **effettuare la compilazione dei contratti** (il deploy dei contratti utilizzando Truffle è stato sfruttando soltanto in fase di sviluppo)
7. Eseguire `npm start` dentro la cartella *webapp* per **avviare l'applicazione WEB** (lasciare in esecuzione l'applicazione WEB ed eseguire i passi rimanenti da un'altra finestra del terminale)
8. Eseguire `node  insert_user.js` dentro la cartella *webapp* per **aggiungere gli utenti** di default
9. Eseguire `node  insert_demo_event.js` dentro la cartella *webapp* per **effettuare il deploy del contratto** di default
10. **Enjoy the webapp!**

## Tipologie di utenti e loro funzioni

- **Tipologia *utenti non registrati***, l'unica azione che possono effettuare gli utenti non registrati che accedono alla webapp è la registrazione, attraverso questa potranno poi compiere le azioni degli *user*.
- **Tipologia *user***, sono gli utenti base della webapp, gli utenti che utilizzano l'applicazione web per consultare le informazioni degli eventi (come i posti ancora disponibili, l'orario, ecc.) ed acquistare biglietti.
- **Tipologia *invalidator***, sono gli utenti che hanno il compito di invalidare il biglietto degli *user* all'ingresso degli eventi. Possono consultare la lista dei biglietti venduti per ciascun evento.
- **Tipologia *admin***, sono gli event manager, possono creare nuovi eventi, settare a concluso o annullato lo stato di un evento, consultare la lista dei biglietti venduti per ciascun evento, annullare i biglietti degli *user*.

## Interfacce WEB 

* [*APP*](http://localhost:3000)
* [*RETE*](http://localhost:8999)

## Relazione 

La [relazione](https://github.com/emanueleincicco/SoftwareCybersecurityProject/blob/616177e300f6c792e7a7eb1dbab916a624edea31/Relazione_Cyber_Security.pdf) è visionabile, per ulteriori dettagli implementativi e di progettazione 


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author 
Bernovschi D., Incicco E., Miscia F., Fratini L., Pinciaroli A. 


## Contact

Project Link: [https://github.com/emanueleincicco/SoftwareCybersecurityProject](https://github.com/emanueleincicco/SoftwareCybersecurityProject)






