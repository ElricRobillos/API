var router = require("express").Router();

const publishersController = require("../controllers/publishers.controller");

router.post("/", publishersController.create);
router.put("/:publisherID", publishersController.update);
router.get("/", publishersController.findAll);
router.get("/:publisherID", publishersController.findOne);
router.delete("/:publisherID", publishersController.delete);

module.exports = router;