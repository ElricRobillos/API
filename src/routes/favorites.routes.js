var router = require("express").Router();

const favoritesController = require("../controllers/favorites.controller");

router.post("/", favoritesController.create);
router.put("/:favoriteId", favoritesController.update);
router.get("/", favoritesController.findAll);
router.get("/:favoriteId", favoritesController.findOne);
router.delete("/:favoriteId", favoritesController.delete);

module.exports = router;