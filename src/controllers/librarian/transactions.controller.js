const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const transactions = db.transactions;

// Create and Save a new author
exports.create_transactions = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.transactions.create(req.body)
        .then((data) => dataResponse(res, data, 'A transaction is added successfully!', 'Failed to add transaction'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all transactions from the database.
exports.findAll_transactions = (req, res) => {
    transactions.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find a single transactions with an id
exports.findOne_transactions = (req, res) => {
    const id = req.params.transactionID; 

    transactions.findByPk(id) 
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
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
        .catch((err) => errResponse(res, err));
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
        .catch((err) => errResponse(res, err));
};

