const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const transactions = db.transactions;

// Add new transaction
exports.add_transaction = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        req.body.addedBy = req.user.userID;
        req.body.updatedBy = req.user.userID;
        
        transactions
            .create(req.body,{
                include: [{
                    model: db.materials_borrow_records,
                    as: "material_borrow_records"
                }]
            })
            .then(result => {
                if(result) {
                    const borrowed_copies = req.body.material_borrow_records;

                    console.log(borrowed_copies);
                    
                    borrowed_copies.forEach(b => 
                        db.copies.update({ status: 'Unavailable' }, { where: { copyID: b.copyID } })
                    );

                    dataResponse(res, result, 'A transaction is added successfully!', 'Failed to add transaction');
                }
            })
            .catch(err => errResponse(res, err));
    }
};

const dbTransactionsOp = { 
    attributes:{
        exclude: [
            'borrowID'
        ]
    },
    include:[
        {
            model: db.materials_borrow_records,
            as: 'material_borrow_records',
            attributes:{
                exclude: [
                    'copyID'
                ]
            },
            include:[
                {
                    model: db.copies,
                    as: 'copy'
                }
            ]
        }, {
            model: db.users,
            as: 'transaction_borrower',
            attributes: {
                exclude: [
                    'password',
                    'addedAt',
                    'addedBy',
                    'updatedAt',
                    'updatedBy',
                ]
            }
        }, {
            model: db.users,
            as: 'added_by_librarian',
            attributes: {
                exclude: [
                    'password',
                    'addedAt',
                    'addedBy',
                    'updatedAt',
                    'updatedBy',
                    'course',
                    'year',
                    'section'
                ]
            }
        }
    ] 
}

// Retrieve all transactions
exports.view_all_transactions = (req, res) => {
    if(req.user == null || req.user.userType != 'Librarian') {
        res.sendStatus(403);
    } else {
        transactions.findAll(dbTransactionsOp)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific transaction
exports.find_transaction = (req, res) => {
    if(req.user == null || req.user.userType != 'Librarian') {
        res.sendStatus(403);
    } else {
        transactions.findByPk(req.params.transactionID, dbTransactionsOp) 
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Update transaction record
exports.update_transaction = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        const id = req.params.transactionID;

        transactions.update(req.body, {
            where:{ 
                transactionID: id 
            }
        })
        .then((result) => {
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
    }
};

// Transactions Count
exports.transactions_count = (req, res) => {
    transactions
        .count()
        .then(result => res.send({ count: result }))
        .catch(err => errResponse(res, err));
}