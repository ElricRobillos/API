var router = require("express").Router();

// User Route 
const usersController = require("../controllers/librarian/users.controller");
router.post("/users", usersController.create_users);
router.get("/users", usersController.findAll_users);

//Authors
const authorsController = require("../controllers/librarian/authors.controller");
router.post("/authors", authorsController.add_authors);
router.put("/authors/:authorID", authorsController.update_author);
router.get("/authors", authorsController.view_all_authors);
router.get("/authors/:authorID", authorsController.find_author);
router.delete("/authors/:authorID", authorsController.change_author_status);

// Buildings Route
const buildingsController = require("../controllers/librarian/buildings.controller");
router.post("/buildings", buildingsController.add_buildings);
router.put("/buildings/:buildingID", buildingsController.update_building);
router.get("/buildings/", buildingsController.view_all_buildings);
router.get("/buildings/:buildingID", buildingsController.find_building);
router.delete("/buildings/:buildingID", buildingsController.change_building_status);

// Copies Route
const copiesController = require("../controllers/librarian/copies.controller");
router.post("/copies", copiesController.create_copies);
router.put("/copies/:copyID", copiesController.update_copies);
router.get("/copies", copiesController.findAll_copies);
router.get("/copies/:copyID", copiesController.findOne_copies);
router.delete("/copies/:copyID", copiesController.delete_copies);

// Genres Route
const genresController = require("../controllers/librarian/genres.controller");
router.post("/genres", genresController.add_genre);
router.put("/genres/:genreID", genresController.update_genre);
router.get("/genres", genresController.view_all_genres);
router.get("/genres/:genreID", genresController.find_genre);
router.delete("/genres/:genreID", genresController.change_genre_status);

// Languages Route
const languagesController = require("../controllers/librarian/languages.controller");
router.post("/languages", languagesController.add_language);
router.put("/languages/:languageID", languagesController.update_language);
router.get("/languages", languagesController.view_all_languages);
router.get("/languages/:languageID", languagesController.find_language);
router.delete("/languages/:languageID", languagesController.change_language_status);

// Material Types Route
const material_typesController = require("../controllers/librarian/material_types.controller");
router.post("/material_types", material_typesController.add_material_type);
router.put("/material_types/:typeID", material_typesController.update_material_type);
router.get("/material_types", material_typesController.view_all_material_types);
router.get("/material_types/:typeID", material_typesController.find_material_type);
router.delete("/material_types/:typeID", material_typesController.change_material_type_status);

// Material Borrow Records Route
const materials_borrow_recordsController = require("../controllers/librarian/materials_borrow_records.controller");
router.post("/materials_borrow_records", materials_borrow_recordsController.add_materials_borrow_record);
router.put("/materials_borrow_records/:borrowID", materials_borrow_recordsController.update_materials_borrow_record);
router.get("/materials_borrow_records", materials_borrow_recordsController.view_all_materials_borrow_records);
router.get("/materials_borrow_records/:borrowID", materials_borrow_recordsController.find_materials_borrow_record);

// Materials Route
const materialsController = require("../controllers/librarian/materials.controller");
router.post("/materials", materialsController.add_material);
router.put("/materials/:materialID", materialsController.update_material);
router.get("/materials", materialsController.view_all_materials);
router.get("/materials/:materialID", materialsController.find_material);
router.delete("/materials/:materialID", materialsController.change_material_status);

// Publication Countries Route
const publication_countriesController = require("../controllers/librarian/publication_countries.controller");
router.post("/publication_countries", publication_countriesController.add_publication_country);
router.put("/publication_countries/:pubCountryID", publication_countriesController.update_publication_country);
router.get("/publication_countries", publication_countriesController.view_all_publication_countries);
router.get("/publication_countries/:pubCountryID", publication_countriesController.find_publication_country);
router.delete("/publication_countries/:pubCountryID", publication_countriesController.change_publication_country_status);

// Publishers Route
const publishersController = require("../controllers/librarian/publishers.controller");
router.post("/publishers", publishersController.add_publisher);
router.put("/publishers/:publisherID", publishersController.update_publisher);
router.get("/publishers", publishersController.view_all_publishers);
router.get("/publishers/:publisherID", publishersController.find_publisher);
router.delete("/publishers/:publisherID", publishersController.change_publisher_status);

// Rooms Route
const roomsController = require("../controllers/librarian/rooms.controller");
router.post("/rooms", roomsController.add_room);
router.put("/rooms/:roomID", roomsController.update_room);
router.get("/rooms", roomsController.view_all_rooms);
router.get("/rooms/:roomID", roomsController.find_room);
router.delete("/rooms/:roomID", roomsController.change_room_status);

// Shelves Route
const shelvesController = require("../controllers/librarian/shelves.controller");
router.post("/shelves", shelvesController.add_shelf);
router.put("/shelves/:shelfID", shelvesController.update_shelf);
router.get("/shelves", shelvesController.view_all_shelves);
router.get("/shelves/:shelfID", shelvesController.find_shelf);
router.delete("/shelves/:shelfID", shelvesController.change_shelf_status);

// Transactions Route
const transactionsController = require("../controllers/librarian/transactions.controller");
router.post("/transactions", transactionsController.create_transactions);
router.put("/transactions/:transactionID", transactionsController.update_transactions);
router.get("/transactions", transactionsController.findAll_transactions);
router.get("/transactions/:transactionID", transactionsController.findOne_transactions);
router.delete("/transactions/:transactionID", transactionsController.delete_transactions);

// Weedings Route
const weedingsController = require("../controllers/librarian/weedings.controller");
router.post("/weedings", weedingsController.create_weedings);
router.put("/weedings/:weedID", weedingsController.update_weedings);
router.get("/weedings", weedingsController.findAll_weedings);
router.get("/weedings/:weedID", weedingsController.findOne_weedings);
router.delete("/weedings/:weedID", weedingsController.delete_weedings);



module.exports = router;