const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const material_types = db.material_types;

// Add new material_type
exports.add_material_type = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        material_types.create(req.body)
        .then((data) => dataResponse(res, data, 'A material type is added successfully!', 'Failed to add material type'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all material_types
exports.view_all_material_types = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        material_types.findAll()
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific material_type
exports.find_material_type = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.typeID; 

        material_types.findByPk(id)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Update material_type record
exports.update_material_type = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.typeID;

        material_types.update(req.body, {
            where:{ 
                typeID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            material_types.findByPk(id)
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
    }
};

// Change status of material_type
exports.change_material_type_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.typeID;
        const body = { 
            status: "Inactive" 
        };

        material_types.update(body, {
            where:{ 
                typeID: id 
            }
        })
        .then((result) => {
            console.log(result);
            if (result) {
                // success update
                material_types.findByPk(id)
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
    }
};

