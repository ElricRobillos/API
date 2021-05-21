var router = require("express").Router();

const roomsController = require("../controllers/rooms.controller");

router.post("/", roomsController.create);
router.put("/:roomID", roomsController.update);
router.get("/", roomsController.findAll);
router.get("/:roomID", roomsController.findOne);
router.delete("/:roomID", roomsController.delete);

module.exports = router;