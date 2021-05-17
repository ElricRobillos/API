var router = require("express").Router();

const copiesController = require("../controllers/copies.controller");

router.post("/", copiesController.create);
router.put("/:copyID", copiesController.update);
router.get("/", copiesController.findAll);
router.get("/:copyID", copiesController.findOne);
router.delete("/:copyID", copiesController.delete);

module.exports = router;