const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const copies = db.copies;

// Add new copy
exports.add_copy = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        copies.create(req.body)
        .then((data) => dataResponse(res, data, 'A Copy is added successfully!', 'Failed to add a copy'))
        .catch((err)  => errResponse(res, err));
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

// Find specific copy
exports.find_copy = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.copyID; 

        copies.findByPk(id)
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

// Change status of copy
exports.change_copy_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.copyID;
        const body = { 
            status: "Inactive" 
        };

        copies.update(body, {
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
        .catch((err)  => errResponse(res, err));
    }
};

