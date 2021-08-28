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
        message: err.message || "Error",
      });
    });
};
exports.findAll = async (req, res) => {
  let limit = 3;
  let offset = 0;
  Product.findAndCountAll()
    .then((data) => {
      const { page } = req.query;
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      console.log({ page: page.page });
      console.log(offset);
      Product.findAll({
        attributes: ["id", "productName", "price", "amout"],
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
      }).then((users) => {
        res
          .status(200)
          .json({ result: users, count: data.count, pages: pages });
      });
    })
    .catch(function (error) {
      res.status(500).send("Internal Server Error");
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
  const id = req.body.id;

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
