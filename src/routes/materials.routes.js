var router = require("express").Router();

const materialsController = require("../controllers/materials.controller");

router.post("/", materialsController.create);
router.put("/:materialID", materialsController.update);
router.get("/", materialsController.findAll);
router.get("/:materialID", materialsController.findOne);
router.delete("/:materialID", materialsController.delete);

module.exports = router;