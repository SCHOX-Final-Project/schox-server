const UserController = require('../controllers/UserController')
const authz = require('../middleware/auth')
const user = require('express').Router()

user.post("/register", UserController.register)
user.post("/login", UserController.login)

user.use(authz)

user.post("/schools", UserController.postSchool)

// user.post("/balances", UserController.postBalances)
user.get("/balances/:userId", UserController.getBalance)
user.patch("/balances/:userId", UserController.updateBalance)

user.post("/subscriptions", UserController.postSubscription)
user.get("/subscriptions/:id", UserController.getSubscription)
user.patch("/subscriptions/:id", UserController.updateSubscription)

user.get("/:id", UserController.getUserDetail)
// user.patch("/:id", UserController.updateUser)

module.exports = user