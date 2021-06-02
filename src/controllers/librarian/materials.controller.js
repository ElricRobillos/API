const db = require("../../models");
const materials = db.materials;

//Create and Save a new materials
exports.create_materials = async (req, res) => {
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
exports.findAll_materials = (req, res) => {
    materials.findAll({ where: { status: "Active"}})
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

// Find a single materials with an id
exports.findOne_materials = (req, res) => {
    const id = req.params.materialID; 

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
exports.update_materials = async (req, res) => {
    const id = req.params.materialID;

    materials.update(req.body, {
        where: { materialID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            materials.findByPk(id).then((data) => {
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

// Delete a materials with the specified id in the request
exports.delete_materials = (req, res) => {
    const id = req.params.materialID;
    const body = { status: "Inactive" };
        materials.update(body, {
            where: { materialID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            materials.findByPk(id).then((data) => {
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

