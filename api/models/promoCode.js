const Sequelize = require("sequelize");
const sequelize = require("../../db/db");

const Promocode = sequelize.define("promocode", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  promoName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  percent: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Promocode;
