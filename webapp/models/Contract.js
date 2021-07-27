const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
  })


const Contratto = sequelize.define('contratto', 
  {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
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
    tableName: 'contratto'
  },
  
  );

  // Create all the defined tables in the specified database
  sequelize.sync().then(() => console.log('Contratto table has been successfully created, if one doesn\'t exist.')).catch(error => console.log('The following error occured: ', error));
  //Contratto.sync({ force: true });
module.exports = Contratto;