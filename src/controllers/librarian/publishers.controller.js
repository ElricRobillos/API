const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const publishers = db.publishers;

// Create and Save a new publisher
exports.create_publishers = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.publishers.create(req.body)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all publishers from the database.
exports.findAll_publishers = (req, res) => {
    publishers.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find a single publishers with an id
exports.findOne_publishers = (req, res) => {
    const id = req.params.publisherID; 

    publishers.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err) => errResponse(res, err));
}; 

// Update a publishers by the id in the request
exports.update_publishers = async (req, res) => {
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
        .catch((err) => errResponse(res, err));
};

// Delete a publishers with the specified id in the request
exports.delete_publishers = (req, res) => {
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
        .catch((err) => errResponse(res, err));
};