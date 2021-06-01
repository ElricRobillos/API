var router = require("express").Router();

// user
const testController = require("../controllers/test.controller");

router.post("/", testController.create);

module.exports = router;