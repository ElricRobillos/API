var router = require("express").Router();

const material_typesController = require("../controllers/material_types.controller");

router.post("/", material_typesController.create);
router.put("/:typeID", material_typesController.update);
router.get("/", material_typesController.findAll);
router.get("/:typeID", material_typesController.findOne);
router.delete("/:typeID", material_typesController.delete);

module.exports = router;