const db = require("../models");
const shelves = require("../models/shelves");
const material_types = db.shelves;


// Create and Save a new shelves
exports.create = async (req, res) => {
    shelves.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A shelf is created successfully."],
        });
    })
    .catch((err) =>{
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message),
        });
    })
    
};

// Retrieve all shelves from the database.
exports.findAll = (req, res) => {

};

// Find a single shelves with an id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    shelves.findByPk(id).then((data) => {
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

// Update a shelves by the id in the request
exports.update = async (req, res) => {

};

// Delete a materials with the specified id in the request
exports.delete = (req, res) => {
    
};

shelves.findAll()
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