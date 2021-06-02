var router = require("express").Router();

// User Route
const usersController = require("../controllers/librarian/users.controller");
router.post("/create_users", usersController.create_users);
router.get("/findAll_users", usersController.findAll_users);

//Author_details
const author_detailsController = require("../controllers/librarian/author_details.controller");
router.post("/", author_detailsController.create_author_details);
router.put("/:authorID", author_detailsController.update_author_details);
router.get("/", author_detailsController.findAll_author_details);
router.get("/:authorID", author_detailsController.findOne_author_details);
router.delete("/:authorID", author_detailsController.delete_author_details);

//Authors
const authorsController = require("../controllers/librarian/authors.controller");
router.post("/", authorsController.create_authors);
router.get("/", authorsController.findAll_authors);


// Buildings Route
const buildingsController = require("../controllers/librarian/buildings.controller");
router.post("/create_buildings", buildingsController.create_buildings);
router.put("/update_buildings/:buildingID", buildingsController.update_buildings);
router.get("/findAll_buildings/", buildingsController.findAll_buildings);
router.get("/findOne_buildings/:buildingID", buildingsController.findOne_buildings);
router.delete("/delete_buildings/:buildingID", buildingsController.delete_buildings);

// Copies Route
const copiesController = require("../controllers/librarian/copies.controller");
router.post("/", copiesController.create_copies);
router.put("/:copyID", copiesController.update_copies);
router.get("/", copiesController.findAll_copies);
router.get("/:copyID", copiesController.findOne_copies);
router.delete("/:copyID", copiesController.delete_copies);

// Genres Route
const genresController = require("../controllers/librarian/genres.controller");
router.post("/", genresController.create_genres);
router.put("/:genreId", genresController.update_genres);
router.get("/", genresController.findAll_genres);
router.get("/:genreId", genresController.findOne_genres);
router.delete("/:genreId", genresController.delete_genres);

// Languages Route
const languagesController = require("../controllers/librarian/languages.controller");
router.post("/", languagesController.create_languages);
router.put("/:languageId", languagesController.update_languages);
router.get("/", languagesController.findAll_languages);
router.get("/:languageId", languagesController.findOne_languages);
router.delete("/:languageId", languagesController.delete_languages);

// Material Types Route
const material_typesController = require("../controllers/librarian/material_types.controller");
router.post("/", material_typesController.create_material_types);
router.put("/:typeID", material_typesController.update_material_types);
router.get("/", material_typesController.findAll_material_types);
router.get("/:typeID", material_typesController.findOne_material_types);
router.delete("/:typeID", material_typesController.delete_material_types);

// Material Borrow Records Route
const materials_borrow_recordsController = require("../controllers/librarian/materials_borrow_records.controller");
router.post("/", materials_borrow_recordsController.create_materials_borrow_records);
router.put("/:borrowID", materials_borrow_recordsController.update_materials_borrow_records);
router.get("/", materials_borrow_recordsController.findAll_materials_borrow_records);
router.get("/:borrowID", materials_borrow_recordsController.findOne_materials_borrow_records);

// Materials Route
const materialsController = require("../controllers/librarian/materials.controller");
router.post("/", materialsController.create_materials);
router.put("/:materialID", materialsController.update_materials);
router.get("/", materialsController.findAll_materials);
router.get("/:materialID", materialsController.findOne_materials);
router.delete("/:materialID", materialsController.delete_materials);

// Publication Countries Route
const publication_countriesController = require("../controllers/librarian/publication_countries.controller");
router.post("/", publication_countriesController.create_publication_countries);
router.put("/:pubCountryId", publication_countriesController.update_publication_countries);
router.get("/", publication_countriesController.findAll_publication_countries);
router.get("/:pubCountryId", publication_countriesController.findOne_publication_countries);
router.delete("/:pubCountryId", publication_countriesController.delete_publication_countries);

// Publishers Route
const publishersController = require("../controllers/librarian/publishers.controller");
router.post("/", publishersController.create_publishers);
router.put("/:publisherID", publishersController.update_publishers);
router.get("/", publishersController.findAll_publishers);
router.get("/:publisherID", publishersController.findOne_publishers);
router.delete("/:publisherID", publishersController.delete_publishers);

// Rooms Route
const roomsController = require("../controllers/librarian/rooms.controller");
router.post("/", roomsController.create_rooms);
router.put("/:roomID", roomsController.update_rooms);
router.get("/", roomsController.findAll_rooms);
router.get("/:roomID", roomsController.findOne_rooms);
router.delete("/:roomID", roomsController.delete_rooms);

// Shelves Route
const shelvesController = require("../controllers/librarian/shelves.controller");
router.post("/create_shelves", shelvesController.create_shelves);
router.put("/update_shelves/:shelfID", shelvesController.update_shelves);
router.get("/findAll_shelves", shelvesController.findAll_shelves);
router.get("/findOne_shelves/:shelfID", shelvesController.findOne_shelves);
router.delete("/delete_shelves/:shelfID", shelvesController.delete_shelves);

// Transactions Route
const transactionsController = require("../controllers/librarian/transactions.controller");
router.post("/", transactionsController.create_transactions);
router.put("/:transactionID", transactionsController.update_transactions);
router.get("/", transactionsController.findAll_transactions);
router.get("/:transactionID", transactionsController.findOne_transactions);
router.delete("/:transactionID", transactionsController.delete_transactions);

// Weedings Route
const weedingsController = require("../controllers/librarian/weedings.controller");
router.post("/", weedingsController.create_weedings);
router.put("/:weedID", weedingsController.update_weedings);
router.get("/", weedingsController.findAll_weedings);
router.get("/:weedID", weedingsController.findOne_weedings);
router.delete("/:weedID", weedingsController.delete_weedings);



module.exports = router;