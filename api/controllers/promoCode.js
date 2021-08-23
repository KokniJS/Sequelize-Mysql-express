const Promocode = require("../models/promoCode");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const SaleData = {
    promoName: req.body.promoName,
    percent: req.body.percent,
  };

  await Product.create(SaleData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Does not work",
      });
    });
};
exports.findAll = async (req, res) => {
  await Promocode.findAll()

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Не работает мэн",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.body.id;
  await Promocode.update(req.body, {
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

exports.delete = async (req, res) => {
  const id = req.body.id;

  await Promocode.destroy({
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
