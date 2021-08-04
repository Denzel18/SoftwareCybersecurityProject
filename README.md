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

### Step by Step 

1. Creare la rete Quorum 
2. node create_database.js 
3. truffle migrate --reset 
4. npm install 
5. npm start
6. node  insert_user.js


### Interfaccia WEB 

* [*APP*](localhost:3000)
* [*RETE*](localhost:8999)

## Relazione 
La [relazione](https://github.com/) è visionabile, per ulteriori dettagli implementativi e di progettazione 


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact
Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)






