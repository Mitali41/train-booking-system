const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: {type: DataTypes.STRING, allowNull: true}
});


module.exports = User;