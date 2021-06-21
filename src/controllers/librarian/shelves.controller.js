const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const shelves = db.shelves;

// Add new shelf
exports.add_shelf = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        shelves.create(req.body)
        .then((data) => dataResponse(res, data, 'A shelf is added successfully!', 'Failed to add shelf'))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all shelves
exports.view_all_shelves = (req, res) => {
    shelves.findAll({ 
        attributes:{
            exclude: [
                'roomID',
                'materialID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.rooms,
                as: 'room'
            },
            {
                model: db.materials,
                as: 'materials'
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find specific shelf
exports.find_shelf = (req, res) => {
    const id = req.params.shelfID; 

    shelves.findByPk(id,{
        attributes:{
            exclude: [
                'roomID',
                'materialID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.rooms,
                as: 'room'
            },
            {
                model: db.materials,
                as: 'materials'
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

// Update shelf record
exports.update_shelf = async (req, res) => {
    const id = req.params.shelfID;

    shelves.update(req.body, {
        where:{ 
            shelfID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        shelves.findByPk(id)
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

// Change status of shelf
exports.change_shelf_status = (req, res) => {
    const id = req.params.shelfID;
    const body = { 
        status: "Inactive" 
    };

    shelves.update(body, {
        where:{ 
            shelfID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        shelves.findByPk(id)
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

