var router = require("express").Router();

const materialsController = require("../controllers/materials.controller");

router.post("/", materialsController.create);
router.put("/:id", materialsController.update);
router.get("/", materialsController.findAll);
router.get("/:id", materialsController.findOne);
router.delete("/:id", materialsController.delete);

module.exports = router;