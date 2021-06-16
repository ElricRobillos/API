const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const shelves = db.shelves;

// Create and Save a new buildings
exports.create_shelves = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.shelves.create(req.body)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all shelves from the database.
exports.findAll_shelves = (req, res) => {
    shelves.findAll({ 
        where: { status: "Active" },
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find a single shelves with an id
exports.findOne_shelves = (req, res) => {
    const id = req.params.shelfID; 

    shelves.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err)  => errResponse(res, err));

};

// Update a shelves by the id in the request
exports.update_shelves = async (req, res) => {
    const id = req.params.shelfID;

    shelves.update(req.body, {
        where: { shelfID: id },
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
        .catch((err)  => errResponse(res, err));

};

// Delete a shelves with the specified id in the request
exports.delete_shelves = (req, res) => {
    const id = req.params.shelfID;
    const body = { status: "Inactive" };
        db.shelves.update(body, {
            where: { shelfID: id },
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
        .catch((err)  => errResponse(res, err));

};

