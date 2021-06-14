var router = require("express").Router();

// User Route 
const usersController = require("../controllers/librarian/users.controller");
router.post("/users", usersController.create_users);
router.get("/users", usersController.findAll_users);

//Author_details
const author_detailsController = require("../controllers/librarian/author_details.controller");
router.post("/author_details", author_detailsController.create_author_details);
router.put("/author_details:authorDetailsID", author_detailsController.update_author_details);
router.get("/author_details", author_detailsController.findAll_author_details);
router.get("/author_details/:authorDetailsID", author_detailsController.findOne_author_details);
router.delete("/author_details/:authorDetailsID", author_detailsController.delete_author_details);

//Authors
const authorsController = require("../controllers/librarian/authors.controller");
router.post("/authors", authorsController.create_authors);
router.get("/authors", authorsController.findAll_authors);


// Buildings Route
const buildingsController = require("../controllers/librarian/buildings.controller");
router.post("/buildings", buildingsController.create_buildings);
router.put("/buildings/:buildingID", buildingsController.update_buildings);
router.get("/buildings/", buildingsController.findAll_buildings);
router.get("/buildings/:buildingID", buildingsController.findOne_buildings);
router.delete("/buildings/:buildingID", buildingsController.delete_buildings);

// Copies Route
const copiesController = require("../controllers/librarian/copies.controller");
router.post("/copies", copiesController.create_copies);
router.put("/copies/:copyID", copiesController.update_copies);
router.get("/copies", copiesController.findAll_copies);
router.get("/copies/:copyID", copiesController.findOne_copies);
router.delete("/copies/:copyID", copiesController.delete_copies);

// Genres Route
const genresController = require("../controllers/librarian/genres.controller");
router.post("/genres", genresController.create_genres);
router.put("/genres/:genreID", genresController.update_genres);
router.get("/genres", genresController.findAll_genres);
router.get("/genres/:genreID", genresController.findOne_genres);
router.delete("/genres/:genreID", genresController.delete_genres);

// Languages Route
const languagesController = require("../controllers/librarian/languages.controller");
router.post("/languages", languagesController.create_languages);
router.put("/languages/:languageId", languagesController.update_languages);
router.get("/languages", languagesController.findAll_languages);
router.get("/languages/:languageId", languagesController.findOne_languages);
router.delete("/languages/:languageId", languagesController.delete_languages);

// Material Types Route
const material_typesController = require("../controllers/librarian/material_types.controller");
router.post("/material_types", material_typesController.create_material_types);
router.put("/material_types/:typeID", material_typesController.update_material_types);
router.get("/material_types", material_typesController.findAll_material_types);
router.get("/material_types/:typeID", material_typesController.findOne_material_types);
router.delete("/material_types/:typeID", material_typesController.delete_material_types);

// Material Borrow Records Route
const materials_borrow_recordsController = require("../controllers/librarian/materials_borrow_records.controller");
router.post("/materials_borrow_records", materials_borrow_recordsController.create_materials_borrow_records);
router.put("/materials_borrow_records/:borrowID", materials_borrow_recordsController.update_materials_borrow_records);
router.get("/materials_borrow_records", materials_borrow_recordsController.findAll_materials_borrow_records);
router.get("/materials_borrow_records/:borrowID", materials_borrow_recordsController.findOne_materials_borrow_records);

// Materials Route
const materialsController = require("../controllers/librarian/materials.controller");
router.post("/materials", materialsController.create_materials);
router.put("/materials/:materialID", materialsController.update_materials);
router.get("/materials", materialsController.findAll_materials);
router.get("/materials/:materialID", materialsController.findOne_materials);
router.delete("/materials/:materialID", materialsController.delete_materials);

// Publication Countries Route
const publication_countriesController = require("../controllers/librarian/publication_countries.controller");
router.post("/publication_countries", publication_countriesController.create_publication_countries);
router.put("/publication_countries/:pubCountryId", publication_countriesController.update_publication_countries);
router.get("/publication_countries", publication_countriesController.findAll_publication_countries);
router.get("/publication_countries/:pubCountryId", publication_countriesController.findOne_publication_countries);
router.delete("/publication_countries/:pubCountryId", publication_countriesController.delete_publication_countries);

// Publishers Route
const publishersController = require("../controllers/librarian/publishers.controller");
router.post("/publishers", publishersController.create_publishers);
router.put("/publishers/:publisherID", publishersController.update_publishers);
router.get("/publishers", publishersController.findAll_publishers);
router.get("/publishers/:publisherID", publishersController.findOne_publishers);
router.delete("/publishers/:publisherID", publishersController.delete_publishers);

// Rooms Route
const roomsController = require("../controllers/librarian/rooms.controller");
router.post("/rooms", roomsController.create_rooms);
router.put("/rooms/:roomID", roomsController.update_rooms);
router.get("/rooms", roomsController.findAll_rooms);
router.get("/rooms/:roomID", roomsController.findOne_rooms);
router.delete("/rooms/:roomID", roomsController.delete_rooms);

// Shelves Route
const shelvesController = require("../controllers/librarian/shelves.controller");
router.post("/shelves", shelvesController.create_shelves);
router.put("/shelves/:shelfID", shelvesController.update_shelves);
router.get("/shelves", shelvesController.findAll_shelves);
router.get("/shelves/:shelfID", shelvesController.findOne_shelves);
router.delete("/shelves/:shelfID", shelvesController.delete_shelves);

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