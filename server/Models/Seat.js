const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Seat = sequelize.define("Seat", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    trainId: { type: DataTypes.INTEGER, allowNull: false },
    number: { type: DataTypes.INTEGER, allowNull: false },
    isReserved: { type: DataTypes.BOOLEAN, defaultValue: false },
});


module.exports = Seat;