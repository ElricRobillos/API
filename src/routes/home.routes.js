var router = require("express").Router();


// Login Route
const loginController = require("../controllers/home/login.controller");
router.post("/login", loginController.login);


// Users Route 
const usersController = require("../controllers/home/users.controller");
router.post("/users", usersController.create_users);


// Get all materials
const materialController = require('../controllers/app/materials.controller');
router.get("/materials/latest"      , materialController.latest_available_materials);
router.get("/materials/pages/:page" , materialController.view_all_available_materials);
router.get("/materials/count"       , materialController.available_materials_count);
router.get("/materials/:materialID" , materialController.get_one_available_material);


// Search
const searchController = require('../controllers/app/search.controller');
router.post('/search', searchController.search_materials);


module.exports = router;