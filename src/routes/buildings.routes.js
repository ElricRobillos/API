var router = require("express").Router();

const buildingsController = require("../controllers/buildings.controller");

router.post("/", buildingsController.create);
router.put("/:buildingID", buildingsController.update);
router.get("/", buildingsController.findAll);
router.get("/:buildingID", buildingsController.findOne);
router.delete("/:buildingID", buildingsController.delete);

module.exports = router;