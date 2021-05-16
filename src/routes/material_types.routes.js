var router = require("express").Router();

const material_typesController = require("../controllers/material_types.controller");

router.post("/", material_typesController.create);
router.put("/:typeId", material_typesController.update);
router.get("/", material_typesController.findAll);
router.get("/:typeId", material_typesController.findOne);
router.delete("/:typeId", material_typesController.delete);

module.exports = router;