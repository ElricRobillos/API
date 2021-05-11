var router = require("express").Router();

const publishersController = require("../controllers/publishers.controller");

router.post("/", publishersController.create);
router.put("/:id", publishersController.update);
router.get("/", publishersController.findAll);
router.get("/:id", publishersController.findOne);
router.delete("/:id", publishersController.delete);

module.exports = router;