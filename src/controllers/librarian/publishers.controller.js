const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const publishers = db.publishers;

// Add new publisher
exports.add_publisher = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        publishers.create(req.body)
        .then((data) => dataResponse(res, data, 'A publisher is added succesfully', 'Failed to add publisher'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all publishers
exports.view_all_publishers = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        publishers.findAll({ 
            where:{ 
                status: "Active" 
            }
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific publisher
exports.find_publisher = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.publisherID; 

        publishers.findByPk(id,{
            where:{ 
                status: "Active" 
            }
        })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.SUCCESS_RETRIEVED],
            });
        })
        .catch((err) => errResponse(res, err));
    }
}; 

// Update publisher record
exports.update_publisher = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.publisherID;

        publishers.update(req.body, {
            where:{ 
                publisherID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            publishers.findByPk(id)
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

// Change status of publisher
exports.change_publisher_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.publisherID;
        const body = { 
            status: "Inactive" 
        };
        
        publishers.update(body, {
            where:{ 
                publisherID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            publishers.findByPk(id)
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