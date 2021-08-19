const Sequelize = require("sequelize");
const sequelize = require("../../db/db");
const User = require("./user");

const Promocode = require("./promoCode");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    default: null,
  },
});

User.hasMany(Order, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Promocode.hasMany(Order, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsTo(Promocode, { foreignKey: "promocodeId" });

module.exports = Order;
