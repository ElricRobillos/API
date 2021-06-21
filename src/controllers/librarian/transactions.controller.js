const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const transactions = db.transactions;

// Add new transaction
exports.add_transaction = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        transactions.create(req.body)
        .then((data) => dataResponse(res, data, 'A transaction is added successfully!', 'Failed to add transaction'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all transactions
exports.view_all_transactions = (req, res) => {
    transactions.findAll({ 
        attributes:{
            exclude: [
                'borrowID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.materials_borrow_records,
                as: 'material_borrow_records'
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific transaction
exports.find_transaction = (req, res) => {
    const id = req.params.transactionID; 

    transactions.findByPk(id,{
        attributes:{
            exclude: [
                'borrowID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.materials_borrow_records,
                as: 'material_borrow_records'
            }
        ]
    }) 
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update transaction record
exports.update_transaction = async (req, res) => {
    const id = req.params.transactionID;

    transactions.update(req.body, {
        where:{ 
            transactionID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        transactions.findByPk(id)
        .then((data) => {
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

// Change status of transaction
exports.change_transaction_status = (req, res) => {
    const id = req.params.transactionID;
    const body = { 
        status: "Inactive" 
    };
    transactions.update(body, {
        where:{ 
            transactionID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        transactions.findByPk(id)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.STATUS_UPDATE],
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

