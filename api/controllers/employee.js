const Delivery = require("../models/delivery");
const Employee = require("../models/employee");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const deliveryId = req.body.deliveryId;

  await Employee.create({ deliveryId: deliveryId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};
exports.findAll = async (req, res) => {
  await Employee.findAll({
    include: [
      {
        model: Delivery,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  Employee.update(req.body, {
    where: { id: id },
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Error",
    });
  });
};

exports.delete = async (req, res) => {
  const id = req.body.id;

  Employee.destroy({
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};
