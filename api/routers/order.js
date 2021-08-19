module.exports = (app) => {
  const orders = require("../controllers/order");
  const isAuth = require("../controllers/auth/isAuth");
  app.post("/order", isAuth, orders.create);
  app.get("/order", orders.findAll);
  app.put("/order", orders.update);
  app.delete("/order", orders.delete);
};
