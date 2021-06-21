var router = require("express").Router();

//User Route
const usersController = require("../controllers/borrowers/users.controller");
router.get("/users", usersController.view_user_account);
router.put("/users/:userID", usersController.update_user);


// Favorites Route
const favoritesController = require("../controllers/borrowers/favorites.controller");
router.post("/favorites", favoritesController.add_favorite);
router.put("/favorites/:favoriteID", favoritesController.update_favorites);
router.get("/favorites", favoritesController.view_all_favorites);
router.get("/favorites/:favoriteID", favoritesController.find_favorite);
router.delete("favorites/:favoriteID", favoritesController.change_favorite_status);


module.exports = router;