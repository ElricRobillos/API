const db = require("../models");
const material_types = db.material_types;

// Create and Save a new material types
exports.create = async (req, res) => {
    material_types.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A material type is created successfully."],
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

// Retrieve all material types from the database.
exports.findAll = (req, res) => {
    material_types.findAll()
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

// Find a single material types with an id
exports.findOne = (req, res) => {
    res.send("finding: " + req.params.id);
};

// Update a material types by the id in the request
exports.update = async (req, res) => {
    
};

// Delete a material types with the specified id in the request
exports.delete = (req, res) => {
    
};

