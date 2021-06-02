const db = require("../../models");
const transactions = db.transactions;

// Create and Save a new transactions
exports.create_transactions = async (req, res) => {
    transactions.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A transaction is created successfully."],
        });
    })
    .catch((err) =>{
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message),
        });
    })
};

// Retrieve all transactions from the database.
exports.findAll_transactions = (req, res) => {
    transactions.findAll({ where: { status: "Active"}})
    .then((data) => {
    res.send({
        error: false,
        data: data,
        message: [process.env.SUCCESS_RETRIEVED],
    });
    })
    .catch((err) => {
    res.status(500).send({
        error: true,
        data: [],
        message: err.errors.map((e) => e.message),
    });
    });
};

// Find a single transactions with an id
exports.findOne_transactions = (req, res) => {
    const id = req.params.transactionID; 

    transactions.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err) => {
        res.status(500).send({
        error: true,
        data: [],
        message:
        err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
    });
};

// Update a transaction by the id in the request
exports.update_transactions = async (req, res) => {
    const id = req.params.transactionID;

    transactions.update(req.body, {
        where: { transactionID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            transactions.findByPk(id).then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in updating a record"],
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
        });
};

// Delete a transaction with the specified id in the request
exports.delete_transactions = (req, res) => {
    const id = req.params.transactionID;
    const body = { status: "Inactive" };
        transactions.update(body, {
            where: { transactionID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            transactions.findByPk(id).then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in deleting a record"],
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
        });
};

