module.exports = (app) => {
  const promocodes = require("../controllers/promoCode");
  app.post("/promocode", promocodes.create);
  app.get("/promocode", promocodes.findAll);
  app.put("/promocode", promocodes.update);
  app.delete("/promocode", promocodes.delete);
};
