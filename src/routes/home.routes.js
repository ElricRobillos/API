var router = require("express").Router();


// Login Route
const loginController = require("../controllers/home/login.controller");
router.post("/login", loginController.login);


// Users Route 
const usersController = require("../controllers/home/users.controller");
router.post("/users", usersController.create_users);


// Get all materials
const materialController = require('../controllers/app/materials.controller');
router.get("/materials", materialController.view_all_available_materials);
router.get("/materials/:materialID", materialController.get_one_available_material);


module.exports = router;