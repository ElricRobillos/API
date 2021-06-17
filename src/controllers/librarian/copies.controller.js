const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const copies = db.copies;

// Create and Save a new copies
exports.create_copies = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.copies.create(req.body)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all copies from the database.
exports.findAll_copies = (req, res) => {
    copies.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find a single copies with an id
exports.findOne_copies = (req, res) => {
    const id = req.params.copyID; 

    copies.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err)  => errResponse(res, err));
};

// Update a copies by the id in the request
exports.update_copies = async (req, res) => {
    const id = req.params.copyID;

    copies.update(req.body, {
        where: { copyID: id },
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
        .catch((err)  => errResponse(res, err));
};

// Delete a copies with the specified id in the request
exports.delete_copies = (req, res) => {
    const id = req.params.copyID;
    const body = { status: "Inactive" };
        copies.update(body, {
            where: { copyID: id },
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
        .catch((err)  => errResponse(res, err));
};

