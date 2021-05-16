const db = require("../models");
const favorites = db.favorites;


// Create and Save a new favorite
exports.create = async (req, res) => {
    favorites.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A favorite is created successfully."],
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

// Retrieve all favorites from the database.
exports.findAll = (req, res) => {
    favorites.findAll()
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

// Find a single favorite with an id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    favorites.findByPk(id).then((data) => {
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

// Update a favorite by the id in the request
exports.update = async (req, res) => {

};

// Delete a favorite with the specified id in the request
exports.delete = (req, res) => {
    
};

