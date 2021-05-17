var router = require("express").Router();

const author_detailsController = require("../controllers/author_details.controller");

router.post("/", author_detailsController.create);
router.put("/:authorID", author_detailsController.update);
router.get("/", author_detailsController.findAll);
router.get("/:authorID", author_detailsController.findOne);
router.delete("/:authorID", author_detailsController.delete);

module.exports = router;