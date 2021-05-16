var router = require("express").Router();

const usersController = require("../controllers/users.controller");

router.post("/", usersController.create);
router.get("/", usersController.findAll);
router.get("/:userId", usersController.findOne);
router.put("/:userId", usersController.update);
router.delete("/:userId", usersController.delete);

module.exports = router;