var router = require("express").Router();

const materialsController = require("../controllers/materials.controller");

router.post("/", materialsController.create);
router.put("/:materialId", materialsController.update);
router.get("/", materialsController.findAll);
router.get("/:materialId", materialsController.findOne);
router.delete("/:materialId", materialsController.delete);

module.exports = router;