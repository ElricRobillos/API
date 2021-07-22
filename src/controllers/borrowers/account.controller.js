const { errResponse, dataResponse, emptyDataResponse } = require("../../helpers/controller.helper")
const db = require("../../models");
const users= db.users;
const bcrypt = require("bcrypt");

// Get Borrower Information
exports.get_borrower_info = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {
        users
            .findByPk(req.user.userID)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};