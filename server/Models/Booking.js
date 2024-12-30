const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  trainId: { type: DataTypes.INTEGER, allowNull: false },
  seatNumbers: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "confirmed" },
});

module.exports = Booking;