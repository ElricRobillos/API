var router = require("express").Router();

const favoritesController = require("../controllers/favorites.controller");

router.post("/", favoritesController.create);
router.put("/:id", favoritesController.update);
router.get("/", favoritesController.findAll);
router.get("/:id", favoritesController.findOne);
router.delete("/:id", favoritesController.delete);

module.exports = router;