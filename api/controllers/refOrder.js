const refOrder = require("../models/refOrder");
const Product = require("../models/product");
const Order = require("../models/order");
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const products = req.body.products;
  const orderId = req.body.orderId;
  const array = [];
  for (let product of products) {
    const Goods = await Product.findOne({ where: { id: product.productId } });
    if (Goods.amout < product.quantity) {
      return res
        .status(404)
        .json({ error: `Product ${Goods.productName} wrong!` });
    } else {
      const qty = Goods.amout - product.quantity;
      const result = await Product.update(
        { amout: qty },
        { where: { id: product.productId } }
      );
      total = Goods.price * product.quantity;
    }
    // console.log(product.quantity);
    const result = await refOrder
      .create({
        productId: product.productId,
        quantity: product.quantity,
        total: total,
        orderId: orderId,
      })

      .then((data) => {
        array.push(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500, err);
      });
  }
  return res.send(array);
};

exports.findAll = async (req, res) => {
  await refOrder
    .findAll({
      include: [
        {
          model: Product,
        },
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
        message: err.message || "Error",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;
  refOrder
    .update(req.body, {
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
  refOrder
    .destroy({
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
