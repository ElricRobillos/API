const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const buildings = db.buildings;

// Add new building
exports.add_buildings = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        buildings.create(req.body)
        .then((data) => dataResponse(res, data, 'A building is added successfully!', 'Failed to add building'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all buildings
exports.view_all_buildings = (req, res) => {
    buildings.findAll({ 
        where:{ 
            status: "Active"
        }
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific building
exports.find_building = (req, res) => {
    const id = req.params.buildingID; 

    buildings.findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update an building record
exports.update_building = async (req, res) => {
    const id = req.params.buildingID;

    buildings.update(req.body, {
        where:{ 
            buildingID: id 
        }
    })
    .then((result) => {
        console.log(result);
        if (result) {
            // success update
            buildings.findByPk(id)
            .then((data) => {
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

// Change status of building
exports.change_building_status = (req, res) => {
    const id = req.params.buildingID;
    const body = { 
        status: "Inactive" 
    };

    buildings.update(body, {
        where:{ 
            buildingID: id 
        }
    })
    .then((result) => {
        console.log(result);
        // success update
        if (result) {
            buildings.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.STATUS_UPDATE],
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

