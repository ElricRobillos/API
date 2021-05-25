var router = require("express").Router();

const usersController = require("../controllers/login.controller");

router.post("/", usersController.login);

module.exports = router;