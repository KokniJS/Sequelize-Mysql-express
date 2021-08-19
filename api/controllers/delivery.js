const Delivery = require("../models/delivery");
const Order = require("../models/order");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const user = req.jwt;
  const orderId = req.body.orderId;

  await Delivery.create({ orderId: orderId })
    .then((data) => {
      if (user.role == "delivery") {
        return res.send(data);
      } else {
        return res.status(401).json({ error: "No permission" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};
exports.findAll = async (req, res) => {
  await Delivery.findAll({
    include: [
      {
        model: Order,
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

  Delivery.update(req.body, {
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

exports.delete = async (req, res) => {
  const id = req.body.id;

  Delivery.destroy({
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
