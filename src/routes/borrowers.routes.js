var router = require("express").Router();

// User Route
const usersController = require("../controllers/borrowers/users.controller");
router.post("/", usersController.create_users);

// Favorites Route
const favoritesController = require("../controllers/borrowers/favorites.controller");
router.post("/", favoritesController.create_favorites);
router.put("/:favoriteID", favoritesController.update_favorites);
router.get("/", favoritesController.findAll_favorites);
router.get("/:favoriteID", favoritesController.findOne_favorites);
router.delete("/:favoriteID", favoritesController.delete_favorites);


module.exports = router;