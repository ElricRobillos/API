var router = require("express").Router();

// User Route 
const usersController = require("../controllers/librarian/users.controller");
router.post("/create_users", usersController.create_users);
router.get("/findAll_users", usersController.findAll_users);

//Author_details
const author_detailsController = require("../controllers/librarian/author_details.controller");
router.post("/create_author_details", author_detailsController.create_author_details);
router.put("/update_author_details:authorDetailsID", author_detailsController.update_author_details);
router.get("/findAll_author_details", author_detailsController.findAll_author_details);
router.get("/findOne_author_details/:authorDetailsID", author_detailsController.findOne_author_details);
router.delete("/delete_author_details/:authorDetailsID", author_detailsController.delete_author_details);

//Authors
const authorsController = require("../controllers/librarian/authors.controller");
router.post("/create_authors", authorsController.create_authors);
router.get("/findAll_authors", authorsController.findAll_authors);


// Buildings Route
const buildingsController = require("../controllers/librarian/buildings.controller");
router.post("/create_buildings", buildingsController.create_buildings);
router.put("/update_buildings/:buildingID", buildingsController.update_buildings);
router.get("/findAll_buildings/", buildingsController.findAll_buildings);
router.get("/findOne_buildings/:buildingID", buildingsController.findOne_buildings);
router.delete("/delete_buildings/:buildingID", buildingsController.delete_buildings);

// Copies Route
const copiesController = require("../controllers/librarian/copies.controller");
router.post("/create_copies", copiesController.create_copies);
router.put("/update_copies/:copyID", copiesController.update_copies);
router.get("/findAll_copies", copiesController.findAll_copies);
router.get("/findOne_copies/:copyID", copiesController.findOne_copies);
router.delete("/delete_copies/:copyID", copiesController.delete_copies);

// Genres Route
const genresController = require("../controllers/librarian/genres.controller");
router.post("/create_genres", genresController.create_genres);
router.put("/update_genres/:genreID", genresController.update_genres);
router.get("/findAll_genres", genresController.findAll_genres);
router.get("/findOne_genres/:genreID", genresController.findOne_genres);
router.delete("/delete_genres/:genreID", genresController.delete_genres);

// Languages Route
const languagesController = require("../controllers/librarian/languages.controller");
router.post("/create_languages", languagesController.create_languages);
router.put("/update_languages/:languageId", languagesController.update_languages);
router.get("/findAll_languages", languagesController.findAll_languages);
router.get("/findOne_languages/:languageId", languagesController.findOne_languages);
router.delete("/delete_languages/:languageId", languagesController.delete_languages);

// Material Types Route
const material_typesController = require("../controllers/librarian/material_types.controller");
router.post("/create_material_types", material_typesController.create_material_types);
router.put("/update_material_types/:typeID", material_typesController.update_material_types);
router.get("/findAll_material_types", material_typesController.findAll_material_types);
router.get("/findOne_material_types/:typeID", material_typesController.findOne_material_types);
router.delete("/delete_material_types/:typeID", material_typesController.delete_material_types);

// Material Borrow Records Route
const materials_borrow_recordsController = require("../controllers/librarian/materials_borrow_records.controller");
router.post("/create_materials_borrow_records", materials_borrow_recordsController.create_materials_borrow_records);
router.put("/update_materials_borrow_records/:borrowID", materials_borrow_recordsController.update_materials_borrow_records);
router.get("/findAll_materials_borrow_records", materials_borrow_recordsController.findAll_materials_borrow_records);
router.get("/findOne_materials_borrow_records/:borrowID", materials_borrow_recordsController.findOne_materials_borrow_records);

// Materials Route
const materialsController = require("../controllers/librarian/materials.controller");
router.post("/create_materials", materialsController.create_materials);
router.put("/update_materials/:materialID", materialsController.update_materials);
router.get("/findAll_materials", materialsController.findAll_materials);
router.get("/findOne_materials/:materialID", materialsController.findOne_materials);
router.delete("/delete_materials/:materialID", materialsController.delete_materials);

// Publication Countries Route
const publication_countriesController = require("../controllers/librarian/publication_countries.controller");
router.post("/create_publication_countries", publication_countriesController.create_publication_countries);
router.put("/update_publication_countries/:pubCountryId", publication_countriesController.update_publication_countries);
router.get("/findAll_publication_countries", publication_countriesController.findAll_publication_countries);
router.get("/findOne_publication_countries/:pubCountryId", publication_countriesController.findOne_publication_countries);
router.delete("/delete_publication_countries/:pubCountryId", publication_countriesController.delete_publication_countries);

// Publishers Route
const publishersController = require("../controllers/librarian/publishers.controller");
router.post("/create_publishers", publishersController.create_publishers);
router.put("/update_publishers/:publisherID", publishersController.update_publishers);
router.get("/findAll_publishers", publishersController.findAll_publishers);
router.get("/findOne_publishers/:publisherID", publishersController.findOne_publishers);
router.delete("/delete_publishers/:publisherID", publishersController.delete_publishers);

// Rooms Route
const roomsController = require("../controllers/librarian/rooms.controller");
router.post("/create_rooms", roomsController.create_rooms);
router.put("/update_rooms/:roomID", roomsController.update_rooms);
router.get("/findAll_rooms", roomsController.findAll_rooms);
router.get("/findOne_rooms/:roomID", roomsController.findOne_rooms);
router.delete("/delete_rooms/:roomID", roomsController.delete_rooms);

// Shelves Route
const shelvesController = require("../controllers/librarian/shelves.controller");
router.post("/create_shelves", shelvesController.create_shelves);
router.put("/update_shelves/:shelfID", shelvesController.update_shelves);
router.get("/findAll_shelves", shelvesController.findAll_shelves);
router.get("/findOne_shelves/:shelfID", shelvesController.findOne_shelves);
router.delete("/delete_shelves/:shelfID", shelvesController.delete_shelves);

// Transactions Route
const transactionsController = require("../controllers/librarian/transactions.controller");
router.post("/create_transactions", transactionsController.create_transactions);
router.put("/update_transactions/:transactionID", transactionsController.update_transactions);
router.get("/findAll_transactions", transactionsController.findAll_transactions);
router.get("/findOne_transactions/:transactionID", transactionsController.findOne_transactions);
router.delete("/delete_transactions/:transactionID", transactionsController.delete_transactions);

// Weedings Route
const weedingsController = require("../controllers/librarian/weedings.controller");
router.post("/create_weedings", weedingsController.create_weedings);
router.put("/update_weedings/:weedID", weedingsController.update_weedings);
router.get("/findAll_weedings", weedingsController.findAll_weedings);
router.get("/findOne_weedings/:weedID", weedingsController.findOne_weedings);
router.delete("/delete_weedings/:weedID", weedingsController.delete_weedings);



module.exports = router;