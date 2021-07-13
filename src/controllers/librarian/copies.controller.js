const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const copies = db.copies;
const { Op } = require('sequelize');

// Add new copy
exports.add_copy = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        const materialID = req.params.materialID;
        const copyNumber = req.body.copyNumber;

        copies.findOne({
            where: {
                [Op.or]: {
                    materialID: materialID,
                    copyNumber: copyNumber
                }
            }
        })
        .then(result => {
            if(result.materialID === materialID && result.copyNumber === copyNumber) {
                console.log('Copy Number already exists');
            } else {
                copies.create(req.body)
                .then((data) => dataResponse(res, data, 'A Copy is added successfully!', 'Failed to add a copy'))
                .catch((err)  => errResponse(res, err));
            }
        })
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all copies
exports.view_all_copies = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        copies.findAll()
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all copies of specific material
exports.view_all_material_copies = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        copies.findAll({
            where: {
                materialID: req.params.materialID
            }
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Find specific copy
exports.find_copy = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {

        copies.findByPk(req.params.copyID, {
            include: [{
                model: db.materials,
                as: 'material',
                include: [{
                    model: db.material_types,
                    as: 'material_type'
                }]
            }]
        })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.SUCCESS_RETRIEVED],
            });
        })
        .catch((err)  => errResponse(res, err));
    }
};

// Update copy record
exports.update_copy = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.copyID;
        
        copies.update(req.body, {
            where:{ 
                copyID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            copies.findByPk(id)
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
        .catch((err)  => errResponse(res, err));
    }
};

// Deleting Copies record
exports.delete_copy = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.copyID;

        copies.destroy({
            where:{ 
                copyID: id 
            }
        })
        .then((result) => {
            console.log(result);
            // success delete
            if (result) {
                copies.findByPk(id)
                .then((data) => {
                    res.send({
                        error: false,
                        data: data,
                        message: [process.env.SUCCESS_DELETE],
                    });
                });
            } else {
                // error in deleting
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
