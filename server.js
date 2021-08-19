const express = require("express");
const nodemon = require("nodemon");
const sequelize = require("./db/db");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
require("./api/routers/refOrder")(app);
require("./api/routers/order")(app);
require("./api/routers/product")(app);
require("./api/routers/promoCode")(app);
require("./api/routers/auth")(app);
require("./api/routers/employee")(app);
require("./api/routers/delivery")(app);

sequelize
  .sync()
  .then((result) => result)
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Работает на ${PORT}`);
});
