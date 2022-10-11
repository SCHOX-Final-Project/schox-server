const UserController = require("../controllers/UserController");
const authz = require("../middleware/auth");
const user = require("express").Router();

user.post("/register", UserController.register)
user.post("/login", UserController.login)
user.post("/balances", UserController.postBalance);

user.use(authz);

user.post("/schools", UserController.postSchool);
user.get("/schools", UserController.getSchools);
user.post("/topup", UserController.topUp);

user.post("/subscriptions", UserController.postSubscription);
user.get("/chat/:userId", UserController.getDetailChat); // untuk chat
user.get("/balances/:userId", UserController.getBalance);

user.get("/subscriptions/:id", UserController.getSubscription);
user.patch("/subscriptions/:id", UserController.updateSubscription);

user.get("/:id", UserController.getUserDetail);

module.exports = user;
