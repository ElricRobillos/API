const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const rooms = db.rooms;

// Add new room
exports.add_room = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        rooms.create(req.body)
        .then((data) => dataResponse(res, data, 'A room is added successfully!', 'Failed to add room'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all rooms
exports.view_all_rooms = (req, res) => {
    rooms.findAll({ 
        attributes:{
            exclude: [
                'buildingID',
                'shelfID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.buildings,
                as: 'building'
            },
            {
                model: db.shelves,
                as: 'shelves'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific room
exports.find_room = (req, res) => {
    const id = req.params.roomID; 

    rooms.findByPk(id,{
        attributes:{
            exclude: [
                'buildingID',
                'shelfID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.buildings,
                as: 'building'
            },
            {
                model: db.shelves,
                as: 'shelves'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update room record
exports.update_room = async (req, res) => {
    const id = req.params.roomID;

    rooms.update(req.body, {
        where:{ 
            roomID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        rooms.findByPk(id)
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

// Change status of room
exports.change_room_status = (req, res) => {
    const id = req.params.roomID;
    const body = { 
        status: "Inactive" 
    };
    
    rooms.update(body, {
        where:{ 
            roomID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        rooms.findByPk(id)
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

