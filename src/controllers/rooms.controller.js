const db = require("../models");
const rooms = db.rooms;

// Create and Save a new rooms
exports.create = async (req, res) => {
    rooms.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A room is created successfully."],
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

// Retrieve all rooms from the database.
exports.findAll = (req, res) => {
    rooms.findAll({ where: { status: "Active"}})
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

// Find a single rooms with an id
exports.findOne = (req, res) => {
    const id = req.params.roomID; 

    rooms.findByPk(id).then((data) => {
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

// Update a room by the id in the request
exports.update = async (req, res) => {
    const id = req.params.roomID;

    rooms.update(req.body, {
        where: { roomID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            rooms.findByPk(id).then((data) => {
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

// Delete a room with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.roomID;
    const body = { status: "Inactive" };
        rooms.update(body, {
            where: { roomID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            rooms.findByPk(id).then((data) => {
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

