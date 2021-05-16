const db = require("../models");
const publishers = db.publishers;

// Create and Save a new publishers
exports.create = async (req, res) => {
    publishers.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A publisher is created successfully."],
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

// Retrieve all publishers from the database.
exports.findAll = (req, res) => {
    publishers.findAll({ where: { status: "Active"}})
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

// Find a single publishers with an id
exports.findOne = (req, res) => {
     const id = req.params.publisherID; 

    publishers.findByPk(id).then((data) => {
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

// Update a publishers by the id in the request
exports.update = async (req, res) => {
    const id = req.params.publisherID;

    publishers.update(req.body, {
        where: { publisherID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            publishers.findByPk(id).then((data) => {
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

// Delete a publishers with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.publisherID;

    const body = { status: "Inactive" };
    
        publishers.update(body, {
            where: { publisherID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            publishers.findByPk(id).then((data) => {
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