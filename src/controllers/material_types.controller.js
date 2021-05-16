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
    material_types.findAll({ where: { status: "Active"}})
    .then((data) => {
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
        message: err.errors.map((e) => e.message),
    });
    });
};

// Find a single material types with an id
exports.findOne = (req, res) => {
    const id = req.params.typeId; 

    material_types.findByPk(id).then((data) => {
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

// Update a material types by the id in the request
exports.update = async (req, res) => {
    const id = req.params.typeId;

    material_types.update(req.body, {
        where: { typeId: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            material_types.findByPk(id).then((data) => {
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
            message: ["Error in updating a record"],
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

// Delete a material types with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.typeId;

    const body = { status: "Inactive" };
    
        material_types.update(body, {
            where: { typeId: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            material_types.findByPk(id).then((data) => {
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

