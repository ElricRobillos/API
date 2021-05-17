var router = require("express").Router();

const languagesController = require("../controllers/languages.controller");

router.post("/", languagesController.create);
router.put("/:languageId", languagesController.update);
router.get("/", languagesController.findAll);
router.get("/:languageId", languagesController.findOne);
router.delete("/:languageId", languagesController.delete);

module.exports = router;
