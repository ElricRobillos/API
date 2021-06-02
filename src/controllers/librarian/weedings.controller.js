const db = require("../../models");
const weedings = db.weedings;

// Create and Save a new weedings
exports.create_weedings = async (req, res) => {
    weedings.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A weedings is created successfully."],
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

// Retrieve all weedings from the database.
exports.findAll_weedings = (req, res) => {
    weedings.findAll({ where: { status: "Active"}})
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

// Find a single weeding with an id
exports.findOne_weedings = (req, res) => {
    const id = req.params.weedID; 

    weedings.findByPk(id).then((data) => {
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

// Update a weedings by the id in the request
exports.update_weedings = async (req, res) => {
    const id = req.params.weedID;

    weedings.update(req.body, {
        where: { weedID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            weedings.findByPk(id).then((data) => {
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

// Delete a weedings with the specified id in the request
exports.delete_weedings = (req, res) => {
    const id = req.params.weedID;
    const body = { status: "Inactive" };
        weedings.update(body, {
            where: { weedID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            weedings.findByPk(id).then((data) => {
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

