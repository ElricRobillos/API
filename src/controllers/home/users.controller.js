const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const bcrypt = require("bcrypt");


// Create and Save a new User
exports.create_users = async (req, res) => {
        req.body.password = await bcrypt.hash(
            req.body.password, 
            parseInt(process.env.SALT_ROUND)
        );
        
        db.users.create(req.body)
        .then((data) => dataResponse(res, data, 'A user is added successfully!', 'Failed to add user'))
        .catch((err) => errResponse(res, err));
};

