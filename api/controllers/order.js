const Order = require("../models/order");
const Product = require("../models/product");
const Promocode = require("../models/promoCode");
const refOrder = require("../models/refOrder");
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const array = [];
  const user = req.jwt.id;
  const promocode = req.body.promocode;

  const result = await refOrder.findAll();
  for (orders of result) {
    array.push(orders.total);
  }
  sum = array.reduce((a, b) => {
    return +a + +b;
  });
  total = sum;
  if (req.body.promocode) {
    const Sale = await Promocode.findOne({
      where: {
        promoName: promocode,
      },
    });
    if (!Sale) {
      return res.status(404).json({ error: "Такого промокода нет!" });
    } else {
      const count = total * (Sale.procent / 100);
      total = total - count;
      await Order.create({
        total: total,
        promocodeId: Sale.id,
        userId: user,
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => res.send(err));
    }
  } else if (!req.body.promocode) {
    await Order.create({
      total: total,
      promocodeId: nulll,
      userId: user,
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => res.send(err));
  }
};

exports.findAll = async (req, res) => {
  await Order.findAll({
    include: [
      {
        model: Product,
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

exports.getById = async (req, res) => {
  const id = req.body.id;
  await Order.findOne({
    where: {
      id: id,
    },
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

  Product.update(req.body, {
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
  const id = req.params.id;

  Product.destroy({
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
