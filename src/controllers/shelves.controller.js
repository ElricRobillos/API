const db = require("../models");
const shelves = db.shelves;

// Create and Save a new shelves
exports.create = async (req, res) => {
    shelves.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A material is created successfully."],
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
    shelves.findAll({ where: { status: "Active"}})
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

// Find a single shelves with an id
exports.findOne = (req, res) => {
    const id = req.params.shelfId; 

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
    const id = req.params.shelfId;

    shelves.update(req.body, {
        where: { shelfId: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            shelves.findByPk(id).then((data) => {
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

// Delete a shelves with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.shelfId;
    const body = { status: "Inactive" };
        shelves.update(body, {
            where: { shelfId: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            shelves.findByPk(id).then((data) => {
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

