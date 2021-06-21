const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const weedings = db.weedings;

// Add new weeding
exports.add_weeding = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        weedings.create(req.body)
        .then((data) => dataResponse(res, data, 'A Weeding is added successfully!', 'Failed to add a Weeding'))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all weedings
exports.view_all_weedings = (req, res) => {
    weedings.findAll({ 
        attributes:{
            exclude: [
                'copyID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.copies,
                as: 'copy'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find specific weeding
exports.find_weeding = (req, res) => {
    const id = req.params.weedID; 

    weedings.findByPk(id,{
        attributes:{
            exclude: [
                'copyID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.copies,
                as: 'copy'
            }
        ]
    })
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err)  => errResponse(res, err));
};

// Update weeding record
exports.update_weeding = async (req, res) => {
    const id = req.params.weedID;

    weedings.update(req.body, {
        where:{ 
            weedID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        weedings.findByPk(id)
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
};

// Change status of weding
exports.change_weeding_status = (req, res) => {
    const id = req.params.weedID;
    const body = { 
        status: "Inactive" 
    };
        
    weedings.update(body, {
        where:{ 
            weedID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        weedings.findByPk(id)
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
};

