var router = require("express").Router();

const genresController = require("../controllers/genres.controller");

router.post("/", genresController.create);
router.put("/:genreId", genresController.update);
router.get("/", genresController.findAll);
router.get("/:genreId", genresController.findOne);
router.delete("/:genreId", genresController.delete);

module.exports = router;
