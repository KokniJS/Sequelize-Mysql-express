const Product = require("../models/product");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const user = req.jwt;
  const product = {
    productName: req.body.productName,
    price: req.body.price,
    amout: req.body.amout,
  };

  await Product.create(product)
    .then((data) => {
      if (user.role == "admin") {
        return res.send(data);
      } else {
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};
exports.findAll = async (req, res) => {
  const orders = require("./order");

  const { productName, price, amout } = req.body;

  await Product.findAll()

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
  const id = req.body.id;

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
