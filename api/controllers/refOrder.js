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
    if (Goods.amout < product.quanitity) {
      return res
        .status(404)
        .json({ error: `Product ${Goods.productName} wrong!` });
    } else {
      const qty = Goods.amout - product.quanitity;
      const result = await Product.update(
        { amout: qty },
        { where: { id: product.productId } }
      );
      total = Goods.price * product.quanitity;
    }
    console.log(product.quanitity);
    const result = await refOrder
      .create({
        productId: product.productId,
        quanitity: product.quanitity,
        total: total,
        orderId: orderId,
      })

      .then((data) => {
        console.log(data);
        array.push(data);
      })
      .catch((err) => {
        res.status(500);
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
        message: err.message || "Ohhhhh",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;
  refOrder
    .update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == id) {
        res.send({
          message: "refOrder was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update refOrder!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating refOrder with id=" + id,
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
        message: err.message || "Does not work",
      });
    });
};
