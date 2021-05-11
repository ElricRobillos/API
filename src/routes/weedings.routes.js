var router = require("express").Router();

const weedingsController = require("../controllers/weedings.controller");

router.post("/", weedingsController.create);
router.put("/:id", weedingsController.update);
router.get("/", weedingsController.findAll);
router.get("/:id", weedingsController.findOne);
router.delete("/:id", weedingsController.delete);

module.exports = router;