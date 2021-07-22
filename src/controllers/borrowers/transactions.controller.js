const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const transactions = db.transactions;
const materials_borrow_records = db.materials_borrow_records;


// Find all transactions
exports.find_all_transactions = (req, res) => {
    transactions
        .findAll({
            where: { userID: req.user.userID },
            include: [
                {
                    model: db.materials_borrow_records,
                    as: 'material_borrow_records'
                }, {
                    model: db.users,
                    as: 'added_by_librarian',
                    attributes: [
                        'firstName',
                        'middleName',
                        'lastName'
                    ]
                }
            ]
        })
        .then(data => dataResponse(res, data, 'User transactions retrieved successfully'))
        .catch(err => errResponse(res, err));
}


// Find one transaction
exports.find_one_transaction = (req, res) => {
    transactions
        .findByPk(req.params.transactionID, {
            where: { userID: req.user.userID },
            include: [
                {
                    model: db.materials_borrow_records,
                    as: 'material_borrow_records',
                    include: [{
                        model: db.copies,
                        as: 'copy',
                        include: [{
                            model: db.materials,
                            as: 'material'
                        }]
                    }]
                }, {
                    model: db.users,
                    as: 'added_by_librarian',
                    attributes: [
                        'firstName',
                        'middleName',
                        'lastName'
                    ]
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Transactions are retrieved successfully', 'No transactions has been retrieved'))
        .catch(err => errResponse(res, err));
}


// Get all copies borrowed per transaction
exports.get_all_copies_borrowed_per_transaction = (req, res) => {
    materials_borrow_records
        .findAll({
            where: { transactionID: req.params.transactionID },
            include: [{
                model: db.copies,
                as: 'copy',
                include: [{
                    model: db.materials,
                    as: 'material'
                }]
            }]
        })
        .then(data => dataResponse(res, data, 'Borroweed copies of a transaction retieved successfully', 'No borrowed copies of this transaction has been retrieved'))
        .catch(err => errResponse(res, err))
}


// Count all transactions
exports.transactions_count = (req, res) => {
    transactions
        .count({ where: { userID: req.user.userID }})
        .then(data => dataResponse(res, data, 'Transactions Count retrieved successfully', 'No transactions count has been retrieved'))
        .catch(err => errResponse(res, err))
}