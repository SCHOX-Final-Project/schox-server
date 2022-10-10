const UserController = require("../controllers/UserController");
const user = require("express").Router();
const auth = require("../middleware/authz");

user.post("/register", UserController.register);
user.post("/login", UserController.login);

user.use(auth);

user.post("/balances", UserController.postBalances);
user.get("/balances/:userId", UserController.getBalance);
user.post("/balancess", UserController.updateBalance);

user.post("/subscriptions", UserController.postSubscription);
user.get("/subscriptions/:id", UserController.getSubscription);
user.patch("/subscriptions/:id", UserController.updateSubscription);

user.get("/:id", UserController.getUserDetail);
user.patch("/:id", UserController.updateUser);

module.exports = user;
