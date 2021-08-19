const Sequelize = require("sequelize");
const sequelize = require("../../db/db");
const Delivery = require("../models/delivery");

const Employee = sequelize.define("employee", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

Delivery.hasMany(Employee, {
  foreignKey: { allowNull: true },
  onDelete: "CASCADE",
});

Employee.belongsTo(Delivery, { foreignKey: "deliveryId" });

module.exports = Employee;
