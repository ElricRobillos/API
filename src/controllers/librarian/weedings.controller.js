const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const weedings = db.weedings;

// Create and Save a new author
exports.create_weedings = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.weedings.create(req.body)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all weedings from the database.
exports.findAll_weedings = (req, res) => {
    weedings.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
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
    .catch((err)  => errResponse(res, err));
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
        .catch((err)  => errResponse(res, err));
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
        .catch((err)  => errResponse(res, err));
};

