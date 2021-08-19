const User = require("../../models/user");
const jwt = require("jwt-simple");
const config = require("../../config");

exports.create = async (req, res) => {
  if (
    !req.body.userName ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.password ||
    !req.body.role
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const userData = {
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role,
  };

  await User.findOne({
    where: {
      userName: userData.userName,
    },
  })
    .then((data) => {
      if (data) {
        return null;
      } else {
        return User.create(userData);
      }
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

exports.add = (req, res) => {
  if (!req.body.userName) {
    return res.status(400);
  } else {
    const { userName } = req.body;
    User.findOne({ where: { userName: userName } })

      .then((data) => {
        if (data) {
          return res.json({ token: jwt.encode(data, config.secretkey) });
        } else {
          return res.status(404).json({ error: "Username wrong!" });
        }
      })
      .catch((err) => {
        console.error("User.login", err);
        return res.sendStatus(400);
      });
  }
};

exports.findByUser = async (req, res) => {
  const { userName } = req.jwt;
  console.log({ userName });
  await User.findOne({ where: { userName: userName } })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send({
          message: "Username doesn't exist!",
        });
      }
    })
    .catch((err) => {
      console.error("User.login", err);
      return res.sendStatus(400);
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  User.update(req.body, {
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
