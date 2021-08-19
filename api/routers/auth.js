module.exports = (app) => {
  const auths = require("../controllers/auth/auth");
  const isAuth = require("../controllers/auth/isAuth");
  app.post("/register", auths.create);
  app.post("/login", auths.add);
  app.get("/profile", isAuth, auths.findByUser);
  app.put("/auth", auths.update);
};
