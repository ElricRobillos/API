const {errResponse, dataResponse, emptyDataResponse} = require("../../helpers/controller.helper")
const { Op } = require("sequelize");
const db = require("../../models");
const rooms = db.rooms;
const shelves = db.shelves;

// Add new room
exports.add_room = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID
        req.body.updatedBy = req.user.userID
        
        rooms.findOne({
            where: {
                roomName: req.body.roomName,
                buildingID: req.body.buildingID
            }
        })
        .then(result => {
            if (result){
                errResponse(res,'Room Already Existed')
            }
            else{
                rooms.create(req.body)
                .then((data) => dataResponse(res, data, 'A room is added successfully!', 'Failed to add room'))
                .catch((err) => errResponse(res, err));
            }
        })
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all rooms
exports.view_all_rooms = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        rooms.findAll({ 
            attributes:{
                exclude: [
                    'buildingID'
                ]
            },
            include:[
                {
                    model: db.buildings,
                    as: 'building'
                }
            ]
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific room
exports.find_room = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.roomID; 

        rooms.findByPk(id,{
            attributes:{
                exclude: [
                    'buildingID'
                ]
            },
            include:[
                {
                    model: db.buildings,
                    as: 'building'
                }
            ]
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Update room record
exports.update_room = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id =  req.params.roomID;

        // Attach the ID for updatedBy
        req.body.updatedBy = req.params.userID;
        
        rooms
            .update(req.body, {where:{ roomID: id }})
            .then((result) => {
                if (result) {
                    rooms
                        .findByPk(id)
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

// Deleting rooms record
exports.delete_room = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.roomID;

        rooms.destroy({
            where:{ 
                roomID: id 
            }
        })
        .then((result) => {
            console.log(result);
            // success delete
            if (result) {
                rooms.findByPk(id)
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
                message: ["Error in deleting a room"],
                });
            }
        })
        .catch((err) => errResponse(res, err));
    }
};


// Room Count
exports.room_count = (req, res) => {
    rooms
        .count({
            col: 'status',
            group: ['status']
        })
        .then((result) => {
            count = {
                total: 0,
                active: 0,
                inactive: 0
            }

            result.forEach(r => {
                
                // Get total count
                count.total += r.count

                // Get all active count
                if(r.status === 'Active')   count.active   += r.count
                if(r.status === 'Inactive') count.inactive += r.count

            });

            // Respond roomd count
            res.send({ count: count });
        })
        .catch((err) => errResponse(res, err));
}

// Get room with shelves by building
exports.get_all_rooms_with_shelves = (req, res) => {
    rooms
        .findAll({
            where: { buildingID: req.params.buildingID },
            include: {
                model: shelves,
                as: 'shelves',
                where: { shelfID: { [Op.not]: null }}
            }
        })
        .then((data) => dataResponse(res, data, 'Rooms with shelves retrieved successfully', 'No rooms with shelves has been retrieved'))
        .catch((err) => errResponse(res, err));
}