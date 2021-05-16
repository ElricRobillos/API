const db = require("../models");
const users = db.users;
const bcrypt = require("bcrypt");


// Create and Save a new User
exports.create = async (req, res) => {
    req.body.fullName = "";

    req.body.password = await bcrypt.hash(
        req.body.password, 
        parseInt(process.env.SALT_ROUND)
    );

    users.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["A User is created successfully."],
            });
                
        })
        .catch((err) =>{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
};


// Retrieve all User from the database.
exports.findAll = (req, res) => {
    users.findAll({ 
        where: { status: "Active" },
    })
    .then((data) => {
    res.send({
        error: false,
        data: data,
        message: ["Retrieved successfully."],
    });
    })
    .catch((err) => {
    res.status(500).send({
        error: true,
        data: [],
        message: err.errors.map((e) => e.message),
    });
    });

};

// Find a single User with an id
exports.findOne = (req, res) => { 
    const id = req.params.userId;

    users.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err) => {
        res.status(500).send({
        error: true,
        data: [],
        message:
        err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
    });

};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = req.params.userId
    req.body.fullName = "";

    if (req.body.password) {
        req.body.password = await bcrypt.hash(
        req.body.password,
        parseInt(process.env.SALT_ROUNDS)
        );
    }

    users.update(req.body, {
        where: { userId: id },
    })
        .then((result) => {
        if (result) {
            // success
            users.findByPk(id).then((data) => {
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
            message: [process.env.SUCCESS_UPDATE],
            });
        }
        })
        .catch((err) => {
            res.status(500).send({
                error: true,
                data: [],
                message:
                err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
            });
    });

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => { 
        // delete
    const id = req.params.userId;
    const body = { status: "Inactive" };

    users.update(body, {
        where: { userId: id },
    })
        .then((result) => {
        if (result) {
            // success
            users.findByPk(id).then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.SUCCESS_UPDATE],
            });
            });
        } else {
            // error in deleting
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in deleting a record"],
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
    });


};

