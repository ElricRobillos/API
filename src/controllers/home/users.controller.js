const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const bcrypt = require("bcrypt");
const users = db.users


// Create and Save a new User
exports.create_users = async (req, res, next) => {
    req.body.password = await bcrypt.hash(
        req.body.password, 
        parseInt(process.env.SALT_ROUND)
    );
    
    // Find if both Student Number and Email existed.
    users.findOne({
        where: {
            idNumber: req.body.idNumber,
            email: req.body.email
        }
    })
    .then(result => {
        if (result){
            return errResponse(res,'User Already Existed')
        }
        else{
            next()
        }
    })
    .catch((err) => errResponse(res, err));

    // Find if Student Number existed.
    users.findOne({
        where: {
            idNumber: req.body.idNumber
        }
    })
    .then(result => {
        if (result){
            return errResponse(res,'Student Number Already Existed')
        }
        else{
            next()
        }
    })
    .catch((err) => errResponse(res, err));

    // Find if Email existed.
    users.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(result => {
        if (result){
            return errResponse(res,'Email Already Existed')
        }
        else{
            next()
        }
    })
    .catch((err) => errResponse(res, err));

    // Create if conditions above not met
    db.users.create(req.body)
    .then((data) => dataResponse(res, data, 'Your account has been successfully registered', 'Failed to register an account'))
    .catch((err) => errResponse(res, err));

};

