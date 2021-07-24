const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
  })


const User = sequelize.define('Users', 
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
      username: {
        allowNull: false,
        type: DataTypes.STRING(40),
        required: true,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(100),
        required: true
      }
  }, 
  {
    tableName: 'Users'
  },
  
  );
  User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }

  // Create all the defined tables in the specified database
  sequelize.sync().then(() => console.log('Users table has been successfully created, if one doesn\'t exist.')).catch(error => console.log('The following error occured: ', error));
  User.sync({ force: true });
module.exports = User;