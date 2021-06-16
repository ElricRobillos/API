const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const material_types = db.material_types;

// Create and Save a new author
exports.create_material_types = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.material_types.create(req.body)
        .then((data) => dataResponse(res, data, 'A material type is added successfully!', 'Failed to add material type'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all material types from the database.
exports.findAll_material_types = (req, res) => {
    material_types.findAll({ where: { status: "Active"}})
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find a single material types with an id
exports.findOne_material_types = (req, res) => {
    const id = req.params.typeID; 

    material_types.findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update a material types by the id in the request
exports.update_material_types = async (req, res) => {
    const id = req.params.typeID;

    material_types.update(req.body, {
        where: { typeID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            material_types.findByPk(id).then((data) => {
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

// Delete a material types with the specified id in the request
exports.delete_material_types = (req, res) => {
    const id = req.params.typeID;
    const body = { status: "Inactive" };
        material_types.update(body, {
            where: { typeID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            material_types.findByPk(id).then((data) => {
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

