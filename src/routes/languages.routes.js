var router = require("express").Router();

const languages = require("../controllers/languages.controller");

router.post("/", languages.create);
router.put("/:id", languages.update);
router.get("/", languages.findAll);
router.get("/:id", languages.findOne);
router.delete("/:id", languages.delete);

module.exports = router;
