var router = require("express").Router();

// Login Route
const usersController = require("../controllers/home/login.controller");
router.post("/", usersController.login);


module.exports = router;