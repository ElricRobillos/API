const multer          = require('multer');
const path            = require('path'); 
const router          = require('express').Router();
const { imageFilter } = require('../helpers/image.helper');
const { errResponse } = require('../helpers/controller.helper');


// Upload Image Middleware
const uploadImage = (req, res, next) => {
    
    // Storage for uploaded images
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.join(__dirname, "../../public/images/materials/")),
        filename: (res, file, cb) => cb(null, "material-" + Date.now() + path.extname(file.originalname))
    });
    
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('image');

    upload(req, res, (err) => {
        if(req.fileValidationError) 
            return errResponse(res, req.fileValidationError)
        else if(err instanceof multer.MulterError || err) 
            return errResponse(res, err)

        next();
    });
}

// Account Route 
const accountController = require("../controllers/librarian/account.controller");

// Librarian Account
router.get   ("/info"            , accountController.get_librarian_info);


// User Route 
const usersController = require("../controllers/librarian/users.controller");

// Users
router.get   ("/users"            , usersController.view_all_users);
router.post  ("/users"            , usersController.add_user);
router.get   ("/users/count"      , usersController.users_count);
router.get   ("/users/:userID"    , usersController.find_user);
router.put   ("/users/:userID"    , usersController.update_user);

// Students
router.get   ("/students"           , usersController.view_all_students);
router.get   ("/students/:userID" , usersController.find_student);

// Staffs
router.get   ("/staffs"           , usersController.view_all_staffs);
router.get   ("/staffs/:userID" , usersController.find_staff);

// Borrowers
router.get   ("/borrowers"         , usersController.view_all_borrowers);
router.post  ("/find-borrower"     , usersController.find_borrower);


// Authors
const authorsController = require("../controllers/librarian/authors.controller");
router.get   ("/authors"           , authorsController.view_all_authors);
router.post  ("/authors"           , authorsController.add_authors);
router.get   ("/authors/count"     , authorsController.authors_count);
router.get   ("/authors/:authorID" , authorsController.find_author);
router.put   ("/authors/:authorID" , authorsController.update_author);
router.delete("/authors/:authorID" , authorsController.delete_author);

// Author Material
const author_materialController = require("../controllers/librarian/author_material.controller");
router.get("/author_material/:authorMaterialID", author_materialController.view_author_materials);

// Buildings Route
const buildingsController = require("../controllers/librarian/buildings.controller");
router.get   ("/buildings"                        , buildingsController.view_all_buildings);
router.post  ("/buildings"                        , buildingsController.add_building);
router.get   ("/buildings/count"                  , buildingsController.buildings_count); 
router.get   ("/buildings/:buildingID"            , buildingsController.find_building);
router.put   ("/buildings/:buildingID"            , buildingsController.update_building);
router.delete("/buildings/:buildingID"            , buildingsController.delete_building);
router.get   ("/buildings/:buildingID/rooms"      , buildingsController.view_all_building_rooms);
router.get   ("/buildings-with-rooms-and-shelves" , buildingsController.get_all_buildings_with_rooms_and_shelves);

// Copies Route
const copiesController = require("../controllers/librarian/copies.controller");
router.get   ("/copies"                       , copiesController.view_all_copies);
router.post  ("/materials/:materialID/copies"     , copiesController.add_copy);
router.get   ("/copies/:copyID"               , copiesController.find_copy);
router.put   ("/copies/:copyID"               , copiesController.update_copy);
router.delete("/copies/:copyID"               , copiesController.delete_copy);
router.get   ("/materials/:materialID/copies" , copiesController.view_all_material_copies);

// Genres Route
const genresController = require("../controllers/librarian/genres.controller");
router.get   ("/genres"          , genresController.view_all_genres);
router.post  ("/genres"          , genresController.add_genre);
router.get   ("/genres/count"    , genresController.genres_count);
router.get   ("/genres/:genreID" , genresController.find_genre);
router.put   ("/genres/:genreID" , genresController.update_genre);
router.delete("/genres/:genreID" , genresController.delete_genre);

// Genre Material
const genre_materialController = require("../controllers/librarian/genre_material.controller");
router.get("/genre_material/:genreMaterialID", genre_materialController.view_genre_materials);

// Languages Route
const languagesController = require("../controllers/librarian/languages.controller");
router.get   ("/languages"             , languagesController.view_all_languages);
router.post  ("/languages"             , languagesController.add_language);
router.get   ("/languages/count"       , languagesController.languages_count);
router.get   ("/languages/:languageID" , languagesController.find_language);
router.put   ("/languages/:languageID" , languagesController.update_language);
router.delete("/languages/:languageID" , languagesController.delete_language);

// Material Types Route
const material_typesController = require("../controllers/librarian/material_types.controller");
router.get   ("/material_types"         , material_typesController.view_all_material_types);
router.post  ("/material_types"         , material_typesController.add_material_type);
router.get   ("/material_types/count"   , material_typesController.material_types_count); 
router.get   ("/material_types/:typeID" , material_typesController.find_material_type);
router.put   ("/material_types/:typeID" , material_typesController.update_material_type);
router.delete("/material_types/:typeID" , material_typesController.delete_material_type);

// Material Borrow Records Route
const materials_borrow_recordsController = require("../controllers/librarian/materials_borrow_records.controller");
router.get("/material_borrow_records"           , materials_borrow_recordsController.view_all_materials_borrow_records);
router.get("/material_borrow_records/count"     , materials_borrow_recordsController.material_borrow_records_count);
router.get("/material_borrow_records/borrowed"  , materials_borrow_recordsController.view_all_borrowed_materials);
router.get("/material_borrow_records/returned"  , materials_borrow_recordsController.view_all_returned_materials);
router.get("/material_borrow_records/:borrowID" , materials_borrow_recordsController.find_materials_borrow_record);
router.put("/material_borrow_records/:borrowID" , materials_borrow_recordsController.update_materials_borrow_record);
router.put("/change_borrow_status/:borrowID"    , materials_borrow_recordsController.change_borrow_status);


// Materials Route
const materialsController = require("../controllers/librarian/materials.controller");
router.get   ("/materials"              , materialsController.view_all_materials);
router.post  ("/materials", uploadImage , materialsController.add_material);
router.get   ("/materials/count"        , materialsController.materials_count);
router.get   ("/materials/:materialID"  , materialsController.find_material);
router.put   ("/materials/:materialID"  , materialsController.update_material);
router.delete("/materials/:materialID"  , materialsController.change_material_status);

// Publication Countries Route
const publication_countriesController = require("../controllers/librarian/publication_countries.controller");
router.get   ("/publication_countries"               , publication_countriesController.view_all_publication_countries);
router.post  ("/publication_countries"               , publication_countriesController.add_publication_country);
router.get   ("/publication_countries/count"         , publication_countriesController.publication_countries_count);
router.get   ("/publication_countries/:pubCountryID" , publication_countriesController.find_publication_country);
router.put   ("/publication_countries/:pubCountryID" , publication_countriesController.update_publication_country);
router.delete("/publication_countries/:pubCountryID" , publication_countriesController.delete_publication_country);

// Publishers Route
const publishersController = require("../controllers/librarian/publishers.controller");
router.get   ("/publishers"              , publishersController.view_all_publishers);
router.post  ("/publishers"              , publishersController.add_publisher);
router.get   ("/publishers/count"        , publishersController.publishers_count);
router.get   ("/publishers/:publisherID" , publishersController.find_publisher);
router.put   ("/publishers/:publisherID" , publishersController.update_publisher);
router.delete("/publishers/:publisherID" , publishersController.delete_publisher);

// Rooms Route
const roomsController = require("../controllers/librarian/rooms.controller");
router.get   ("/rooms"                          , roomsController.view_all_rooms);
router.post  ("/rooms"                          , roomsController.add_room);
router.get   ("/rooms/count"                    , roomsController.room_count);
router.get   ("/rooms/:roomID"                  , roomsController.find_room);
router.put   ("/rooms/:roomID"                  , roomsController.update_room);
router.delete("/rooms/:roomID"                  , roomsController.delete_room);
router.get   ("/rooms-with-shelves/:buildingID" , roomsController.get_all_rooms_with_shelves);

// Shelves Route
const shelvesController = require("../controllers/librarian/shelves.controller");
router.get   ("/shelves"              , shelvesController.view_all_shelves);
router.post  ("/shelves"              , shelvesController.add_shelf);
router.get   ("/shelves/count"        , shelvesController.shelves_count);
router.put   ("/shelves/:shelfID"     , shelvesController.update_shelf);
router.get   ("/shelves/:shelfID"     , shelvesController.find_shelf);
router.delete("/shelves/:shelfID"     , shelvesController.delete_shelf);
router.get   ("/room-shelves/:roomID" , shelvesController.get_all_shelves_of_room);

// Transactions Route
const transactionsController = require("../controllers/librarian/transactions.controller");
router.get ("/transactions"                , transactionsController.view_all_transactions);
router.post("/transactions"                , transactionsController.add_transaction);
router.get ("/transactions/count"          , transactionsController.transactions_count);
router.put ("/transactions/:transactionID" , transactionsController.update_transaction);
router.get ("/transactions/:transactionID" , transactionsController.find_transaction);

// Weedings Route
const weedingsController = require("../controllers/librarian/weedings.controller");
router.get   ("/weedings"            , weedingsController.view_all_weedings);
router.get   ("/weedings/:weedID"    , weedingsController.find_weeding);
router.put   ("/weedings/:weedID"    , weedingsController.update_weeding);
router.delete("/weedings/:weedingID" , weedingsController.delete_weeding);


module.exports = router;