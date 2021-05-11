var router = require("express").Router();

const shelvesController = require("../controllers/shelves.controller");

router.post("/", shelvesController.create);
router.put("/:id", shelvesController.update);
router.get("/", shelvesController.findAll);
router.get("/:id", shelvesController.findOne);
router.delete("/:id", shelvesController.delete);

module.exports = router;