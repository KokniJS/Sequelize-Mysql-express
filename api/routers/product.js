module.exports = (app) => {
  const products = require("../controllers/product");
  app.post("/product", products.create);
  app.get("/product", products.findAll);
  app.put("/product", products.update);
  app.delete("/product", products.delete);
};
