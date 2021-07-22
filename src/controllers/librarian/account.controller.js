const { errResponse, dataResponse, emptyDataResponse } = require("../../helpers/controller.helper")
const db = require("../../models");
const users= db.users;
const bcrypt = require("bcrypt");

// Get Librarian Information
exports.get_librarian_info = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        users
            .findByPk(req.user.userID)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};