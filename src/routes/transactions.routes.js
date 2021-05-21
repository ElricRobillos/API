var router = require("express").Router();

const transactionsController = require("../controllers/transactions.controller");

router.post("/", transactionsController.create);
router.put("/:transactionID", transactionsController.update);
router.get("/", transactionsController.findAll);
router.get("/:transactionID", transactionsController.findOne);
router.delete("/:transactionID", transactionsController.delete);

module.exports = router;