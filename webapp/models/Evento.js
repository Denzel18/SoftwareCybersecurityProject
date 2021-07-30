const {Sequelize, DataTypes} = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
})


const Event = sequelize.define('Event',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        titolo: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
    },
    {
        tableName: 'event'
    },
);

// Create all the defined tables in the specified database
Event.sync({force: true}).then(() => console.log('Table \'' + Event.tableName + '\' has been successfully created.')).catch(error => console.log('The following error occured: ', error));
module.exports = Event;