const db = require("../models");
const buildings = db.buildings;

// Create and Save a new buildings
exports.create = async (req, res) => {
    buildings.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A building is created successfully."],
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

// Retrieve all buildings from the database.
exports.findAll = (req, res) => {
    buildings.findAll({ where: { status: "Active"}})
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

// Find a single buildings with an id
exports.findOne = (req, res) => {
    const id = req.params.buildingID; 

    buildings.findByPk(id).then((data) => {
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

// Update a buildings by the id in the request
exports.update = async (req, res) => {
    const id = req.params.buildingID;

    buildings.update(req.body, {
        where: { buildingID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            buildings.findByPk(id).then((data) => {
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

// Delete a building with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.buildingID;
    const body = { status: "Inactive" };
        buildings.update(body, {
            where: { buildingID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            buildings.findByPk(id).then((data) => {
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

