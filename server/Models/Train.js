const { DataTypes } = require("sequelize");
const sequelize = require('../database');

const Train = sequelize.define("Train", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
    name: { type: DataTypes.STRING, allowNull: false },
    fromStation: { type: DataTypes.STRING, allowNull: false },
    toStation: { type: DataTypes.STRING, allowNull: false },
    departureTime: { type: DataTypes.DATE, allowNull: false },
    arrivalTime: { type: DataTypes.DATE, allowNull: false },
});


module.exports = Train;
