var router = require("express").Router();

const copiesController = require("../controllers/copies.controller");

router.post("/", copiesController.create);
router.put("/:id", copiesController.update);
router.get("/", copiesController.findAll);
router.get("/:id", copiesController.findOne);
router.delete("/:id", copiesController.delete);

module.exports = router;