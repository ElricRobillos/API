const db = require("../models");
const copies = db.copies;

// Create and Save a new copies
exports.create = async (req, res) => {
    copies.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A copy is created successfully."],
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

// Retrieve all copies from the database.
exports.findAll = (req, res) => {
    copies.findAll({ where: { status: "Active"}})
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

// Find a single copies with an id
exports.findOne = (req, res) => {
    const id = req.params.copyID; 

    copies.findByPk(id).then((data) => {
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

// Update a copies by the id in the request
exports.update = async (req, res) => {
    const id = req.params.materialId;

    copies.update(req.body, {
        where: { materialId: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            copies.findByPk(id).then((data) => {
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

// Delete a copies with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.copyID;
    const body = { status: "Inactive" };
        copies.update(body, {
            where: { materialId: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            copies.findByPk(id).then((data) => {
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

