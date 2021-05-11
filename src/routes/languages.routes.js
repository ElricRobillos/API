var router = require("express").Router();

const languagesController = require("../controllers/languages.controller");

router.post("/", languagesController.create);
router.put("/:id", languagesController.update);
router.get("/", languagesController.findAll);
router.get("/:id", languagesController.findOne);
router.delete("/:id", languagesController.delete);

module.exports = router;
