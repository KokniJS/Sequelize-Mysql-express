const Sequelize = require("sequelize");
const sequelize = require("../../db/db");
const Product = require("./product");
const Order = require("../models/order");

const refOrder = sequelize.define("refOrder", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quanitity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Product.hasMany(refOrder, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Order.hasMany(refOrder, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

refOrder.belongsTo(Product, { foreignKey: "productId" });

refOrder.belongsTo(Order, { foreignKey: "orderId" });

module.exports = refOrder;
