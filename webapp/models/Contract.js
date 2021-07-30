const {Sequelize, DataTypes} = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})


const Contract = sequelize.define('Contract',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
    },
    {
        tableName: 'contract'
    },
);

// Create all the defined tables in the specified database
Contract.sync().then(() => console.log('Table \'' + Contract.tableName + '\' has been successfully created.')).catch(error => console.log('The following error occured: ', error));
// Contract.sync({ force: true }).then(() => console.log('Table \'' + Contract.tableName + '\' has been successfully created.')).catch(error => console.log('The following error occured: ', error));
module.exports = Contract;