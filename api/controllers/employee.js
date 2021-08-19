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
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
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
