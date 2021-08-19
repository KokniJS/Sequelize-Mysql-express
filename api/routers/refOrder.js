const isAuth = require("../controllers/auth/isAuth");
module.exports = (app) => {
  const reforders = require("../controllers/refOrder");
  app.post("/reforder", reforders.create);
  app.get("/reforder", reforders.findAll);
  app.put("/reforder", reforders.update);
  app.delete("/reforder", reforders.delete);
};
