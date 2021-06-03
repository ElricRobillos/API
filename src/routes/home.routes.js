var router = require("express").Router();

// Login Route
const loginController = require("../controllers/home/login.controller");
router.post("/login", loginController.login);

// Users Route 
const usersController = require("../controllers/home/users.controller");
router.post("/create_users", usersController.create_users);

module.exports = router;