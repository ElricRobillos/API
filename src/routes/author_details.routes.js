var router = require("express").Router();

const author_detailsController = require("../controllers/author_details.controller");

router.post("/", author_detailsController.create);
router.put("/:id", author_detailsController.update);
router.get("/", author_detailsController.findAll);
router.get("/:id", author_detailsController.findOne);
router.delete("/:id", author_detailsController.delete);

module.exports = router;