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

//Authors
const authorsController = require("../controllers/borrowers/authors.controller");
router.get("/authors", authorsController.view_all_authors);
router.get("/authors/:authorID", authorsController.find_author);

// Genres Route
const genresController = require("../controllers/borrowers/genres.controller");
router.get("/genres", genresController.view_all_genres);
router.get("/genres/:genreID", genresController.find_genre);

// Languages Route
const languagesController = require("../controllers/borrowers/languages.controller");
router.get("/languages", languagesController.view_all_languages);
router.get("/languages/:languageID", languagesController.find_language);

// Material Types Route
const material_typesController = require("../controllers/borrowers/material_types.controller");
router.get("/material_types", material_typesController.view_all_material_types);
router.get("/material_types/:typeID", material_typesController.find_material_type);

// Materials Route
const materialsController = require("../controllers/borrowers/materials.controller");
router.get("/materials", materialsController.view_all_materials);
router.get("/materials/:materialID", materialsController.find_material);

// Publication Countries Route
const publication_countriesController = require("../controllers/borrowers/publication_countries.controller");
router.get("/publication_countries", publication_countriesController.view_all_publication_countries);
router.get("/publication_countries/:pubCountryID", publication_countriesController.find_publication_country);

// Publishers Route
const publishersController = require("../controllers/borrowers/publishers.controller");
router.get("/publishers", publishersController.view_all_publishers);
router.get("/publishers/:publisherID", publishersController.find_publisher);

module.exports = router;