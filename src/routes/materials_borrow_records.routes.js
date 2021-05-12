var router = require("express").Router();

const materials_borrow_recordsController = require("../controllers/materials_borrow_records.controller");

router.post("/", materials_borrow_recordsController.create);
router.put("/:id", materials_borrow_recordsController.update);
router.get("/", materials_borrow_recordsController.findAll);
router.get("/:id", materials_borrow_recordsController.findOne);
router.delete("/:id", materials_borrow_recordsController.delete);

module.exports = router;