module.exports = (app) => {
  const deliverys = require("../controllers/delivery");
  const isAuth = require("../controllers/auth/isAuth");
  app.post("/delivery", isAuth,deliverys.create);
  app.get("/delivery",isAuth, deliverys.findAll);
  app.put("/delivery", deliverys.update);
  app.delete("/delivery", deliverys.delete);
};
