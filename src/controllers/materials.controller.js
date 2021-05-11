const db = require("../models");
const materials = db.materials;

// Create and Save a new materials
exports.create = async (req, res) => {
    materials.create(req.body).then((data) => {
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

// Retrieve all materials from the database.
exports.findAll = (req, res) => {
    materials.findAll()
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

// Find a single materials with an id
exports.findOne = (req, res) => {
    //res.send("finding: " + req.params.id);
    const id = req.params.id; 

    materials.findByPk(id).then((data) => {
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

// Update a materials by the id in the request
exports.update = async (req, res) => {
    // const materialId = req.params.id;

    // materials.update(req.body, {
    //     where: { id: materialId },
    // })
    //     .then((result) => {
    //     console.log(result);
    //     if (result) {
    //         // success
    //         materials.findByPk(id).then((data) => {
    //             res.send({
    //                 error: false,
    //                 data: data,
    //                 message: [process.env.SUCCESS_UPDATE],
    //             });
    //         });
    //     } else {
    //         // error in updating
    //         res.status(500).send({
    //         error: true,
    //         data: [],
    //         message: ["Error in updating a record"],
    //         });
    //     }
    //     })
    //     .catch((err) => {
    //     res.status(500).send({
    //         error: true,
    //         data: [],
    //         message:
    //         err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
    //     });
    //     });
};

// Delete a materials with the specified id in the request
exports.delete = (req, res) => {
    
};

