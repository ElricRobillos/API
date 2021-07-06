var router = require("express").Router();

const usersController = require("../controllers/librarian/users.controller");

router.get   ("/datatable" , usersController.findDataTable)
router.post  ("/"          , usersController.create);
router.get   ("/"          , usersController.findAll);
router.get   ("/:userID"   , usersController.findOne);
router.put   ("/:userID"   , usersController.update);
router.delete("/:userID"   , usersController.delete);

module.exports = router;