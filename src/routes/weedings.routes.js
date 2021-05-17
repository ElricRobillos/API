var router = require("express").Router();

const weedingsController = require("../controllers/weedings.controller");

router.post("/", weedingsController.create);
router.put("/:weedID", weedingsController.update);
router.get("/", weedingsController.findAll);
router.get("/:weedID", weedingsController.findOne);
router.delete("/:weedID", weedingsController.delete);

module.exports = router;