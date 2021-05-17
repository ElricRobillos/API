var router = require("express").Router();

const shelvesController = require("../controllers/shelves.controller");

router.post("/", shelvesController.create);
router.put("/:shelfId", shelvesController.update);
router.get("/", shelvesController.findAll);
router.get("/:shelfId", shelvesController.findOne);
router.delete("/:shelfId", shelvesController.delete);

module.exports = router;