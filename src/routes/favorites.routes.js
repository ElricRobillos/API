var router = require("express").Router();

const favoritesController = require("../controllers/favorites.controller");

router.post("/", favoritesController.create);
router.put("/:favoriteID", favoritesController.update);
router.get("/", favoritesController.findAll);
router.get("/:favoriteID", favoritesController.findOne);
router.delete("/:favoriteID", favoritesController.delete);

module.exports = router;