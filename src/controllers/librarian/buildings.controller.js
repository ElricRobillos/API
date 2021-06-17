const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const buildings = db.buildings;

// Create and Save a new buildings
exports.create_buildings = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.buildings.create(req.body)
        .then((data) => dataResponse(res, data, 'A building is added successfully!', 'Failed to add building'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all buildings from the database.
exports.findAll_buildings = (req, res) => {
    buildings.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find a single buildings with an id
exports.findOne_buildings = (req, res) => {
    const id = req.params.buildingID; 

    buildings.findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update a buildings by the id in the request
exports.update_buildings = async (req, res) => {
    const id = req.params.buildingID;

    buildings.update(req.body, {
        where: { buildingID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            buildings.findByPk(id).then((data) => {
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

// Delete a building with the specified id in the request
exports.delete_buildings = (req, res) => {
    const id = req.params.buildingID;
    const body = { status: "Inactive" };
        buildings.update(body, {
            where: { buildingID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            buildings.findByPk(id).then((data) => {
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

