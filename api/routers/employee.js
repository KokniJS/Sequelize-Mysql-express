module.exports = (app) => {
  const emplooyees = require("../controllers/employee");
  app.post("/emplooyee", emplooyees.create);
  app.get("/emplooyee", emplooyees.findAll);
  app.put("/emplooyee", emplooyees.update);
  app.delete("/emplooyee", emplooyees.delete);
};
