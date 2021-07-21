const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const transactions = db.transactions;

exports.find_all_transactions = (req, res) => {
    transactions
        .findAll({
            where: { userID: req.user.userID },
            include: [{
                model: db.materials_borrow_records,
                as: 'material_borrow_records'
            }]
        })
        .then(data => dataResponse(res, data, 'User transactions retrieved successfully'))
        .catch(err => errResponse(res, err));
}