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
  const promoCode = req.body.promoCode;

  const result = await refOrder.findAll();
  for (orders of result) {
    array.push(orders.total);
  }
  sum = array.reduce((a, b) => {
    return +a + +b;
  });
  total = sum;
  if (req.body.promoCode) {
    const Sale = await Promocode.findOne({
      where: {
        promoName: promoCode,
      },
    });
    if (!Sale) {
      return res.status(404).json({ error: "Такого промокода нет!" });
    } else {
      const count = total * (Sale.percent / 100);
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
  } else if (!req.body.promoCode) {
    await Order.create({
      total: total,
      promocodeId: null,
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
        message: err.message || "Error",
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
        message: err.message || "Error",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  Product.update(req.body, {
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
  const id = req.params.id;

  Product.destroy({
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
