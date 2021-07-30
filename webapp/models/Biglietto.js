const {Sequelize, DataTypes} = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
})


const Ticket = sequelize.define('Ticket',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_evento: {
            allowNull: false,
            type: DataTypes.INTEGER
        },

        titolo: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
        tipoBiglietto: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        }
    },
    {
        tableName: 'ticket'
    },
);

// Create all the defined tables in the specified database
Ticket.sync({force: true}).then(() => console.log('Table \'' + Ticket.tableName + '\' has been successfully created.')).catch(error => console.log('The following error occured: ', error));
module.exports = Ticket;