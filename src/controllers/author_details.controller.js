const db = require("../models");
const author_details = db.author_details;

// Create and Save a new author detail
exports.create = async (req, res) => {
    author_details.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A author details is created successfully."],
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

// Retrieve all author details from the database.
exports.findAll = (req, res) => {
    author_details.findAll({ where: { status: "Active"}})
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

// Find a single author details with an id
exports.findOne = (req, res) => {
     const id = req.params.authorID; 

    author_details.findByPk(id).then((data) => {
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

// Update an author details by the id in the request
exports.update = async (req, res) => {
    const id = req.params.authorID;

    author_details.update(req.body, {
        where: { authorID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            author_details.findByPk(id).then((data) => {
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

// Delete an author details with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.authorID;

    const body = { status: "Inactive" };
    
        author_details.update(body, {
            where: { authorID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            author_details.findByPk(id).then((data) => {
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