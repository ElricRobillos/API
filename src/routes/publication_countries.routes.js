var router = require("express").Router();

const publication_countriesController = require("../controllers/publication_countries.controller");

router.post("/", publication_countriesController.create);
router.put("/:pubCountryId", publication_countriesController.update);
router.get("/", publication_countriesController.findAll);
router.get("/:pubCountryId", publication_countriesController.findOne);
router.delete("/:pubCountryId", publication_countriesController.delete);

module.exports = router;
