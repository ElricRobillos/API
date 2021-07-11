const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const bcrypt = require("bcrypt");
const users = db.users
const { Op } = require('sequelize');

// Create and Save a new User
exports.create_users = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUND));
    
    const idNumber = req.body.idNumber;
    const email = req.body.email;

    // Find if both Student Number and Email existed.
    users
        .findOne({
            where: {
                [Op.or]: {
                    idNumber: idNumber,
                    email: email
                }
            }
        })
        .then(result => {
            if(result.idNumber === idNumber && result.email === email) {
                console.log('User already exists');
            } else if(result.idNumber === idNumber) {
                console.log('Student Number is already used');
            } else if(result.email === email) {
                console.log('Email is already used');
            } else {
                db.users
                    .create(req.body)
                    .then((data) => dataResponse(res, data, 'Your account has been successfully registered', 'Failed to register an account'))
                    .catch((err) => errResponse(res, err));
            }
        })
        .catch((err) => errResponse(res, err));
};

