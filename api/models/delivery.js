const Sequelize = require("sequelize");
const sequelize = require("../../db/db");
const Order = require("../models/order");

const Delivery = sequelize.define("delivery", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

Order.hasMany(Delivery, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

Delivery.belongsTo(Order, { foreignKey: "orderId" });

module.exports = Delivery;
