var router = require("express").Router();

// User Route
// const usersController = require("../controllers/borrowers/users.controller");
// router.post("/", usersController.create_users);

// Favorites Route
const favoritesController = require("../controllers/borrowers/favorites.controller");
router.post("/favorites", favoritesController.create_favorites);
router.put("/favorites/:favoriteID", favoritesController.update_favorites);
router.get("/favorites", favoritesController.findAll_favorites);
router.get("/favorites/:favoriteID", favoritesController.findOne_favorites);
router.delete("favorites/:favoriteID", favoritesController.delete_favorites);


module.exports = router;