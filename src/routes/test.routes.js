var router = require("express").Router();

// user
const testController = require("../controllers/test.controller");

router.post("/", testController.create);

router.get("/populate/publication-countries", testController.populatePubCountries);

module.exports = router;