var router = require("express").Router();

const shelvesController = require("../controllers/shelves.controller");

router.post("/", shelvesController.create);
router.put("/:shelfID", shelvesController.update);
router.get("/", shelvesController.findAll);
router.get("/:shelfID", shelvesController.findOne);
router.delete("/:shelfID", shelvesController.delete);

module.exports = router;