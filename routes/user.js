<<<<<<< HEAD
const UserController = require("../controllers/UserController");
const user = require("express").Router();
const auth = require("../middleware/authz");
=======
const UserController = require('../controllers/UserController')
const authz = require('../middleware/auth')
const user = require('express').Router()
>>>>>>> 5627ff58b51c71ade591b1f7812d43faf4eecd7f

user.post("/register", UserController.register);
user.post("/login", UserController.login);

<<<<<<< HEAD
user.use(auth);
=======
user.use(authz)

user.post("/schools", UserController.postSchool)

// user.post("/balances", UserController.postBalances)
user.get("/balances/:userId", UserController.getBalance)
user.patch("/balances/:userId", UserController.updateBalance)
>>>>>>> 5627ff58b51c71ade591b1f7812d43faf4eecd7f

user.post("/balances", UserController.postBalances);
user.get("/balances/:userId", UserController.getBalance);
user.post("/balancess", UserController.updateBalance);

<<<<<<< HEAD
user.post("/subscriptions", UserController.postSubscription);
user.get("/subscriptions/:id", UserController.getSubscription);
user.patch("/subscriptions/:id", UserController.updateSubscription);
=======
user.get("/:id", UserController.getUserDetail)
// user.patch("/:id", UserController.updateUser)
>>>>>>> 5627ff58b51c71ade591b1f7812d43faf4eecd7f

user.get("/:id", UserController.getUserDetail);
user.patch("/:id", UserController.updateUser);

module.exports = user;
