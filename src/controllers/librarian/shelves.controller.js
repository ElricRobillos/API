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
        
        shelves.findOne({
            where: {
                shelfName: req.body.shelfName,
                roomID: req.body.roomID
            }
        })
        .then(result => {
            if (result){
                errResponse(res,'Shelf Already Existed')
            }
            else{
                shelves.create(req.body)
                .then((data) => dataResponse(res, data, 'A shelf is added successfully!', 'Failed to add shelf'))
                .catch((err)  => errResponse(res, err));
            }
        })
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all shelves
exports.view_all_shelves = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        shelves.findAll({ 
            attributes:{
                exclude: [
                    'roomID'
                ]
            },
            include:[
                {
                    model: db.rooms,
                    as: 'room',
                    include: [
                        {
                            model: db.buildings,
                            as: 'building'
                        }
                    ]
                }
            ] 
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Find specific shelf
exports.find_shelf = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.shelfID; 

        shelves.findByPk(id,{
            attributes:{
                exclude: [
                    'roomID'
                ]
            },
            include: [
                {
                    model: db.rooms,
                    as: 'room',
                    include: [
                        {
                            model: db.buildings,
                            as: 'building'
                        }
                    ]
                },
                {
                    model: db.users,
                    as: "added_by_librarian",
                    attributes:{
                        exclude: [
                            'password',
                            'profilePic',
                            'section',
                            'course',
                            'year',
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.users,
                    as: "updated_by_librarian",
                    attributes:{
                        exclude: [
                            'password',
                            'profilePic',
                            'section',
                            'course',
                            'year',
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
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
    }
};

// Update shelf record
exports.update_shelf = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.shelfID;

        shelves.update(req.body, {
            where:{ 
                shelfID: id 
            },
            include: [
                {
                    model: db.rooms,
                    as: 'room',
                    attributes:{
                        exclude: [
                            'status',
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'roomID'
                        ]
                    },
                    include: [
                        {
                            model: db.buildings,
                            as: 'building',
                            attributes:{
                                exclude: [
                                    'status',
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt',
                                    'roomID'
                                ]
                            },
                            
                        }
                    ]
                }
            ]
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
    }
};

// Deleting shelf record
exports.delete_shelf = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.shelfID;

        shelves.destroy({
            where:{ 
                shelfID: id 
            }
        })
        .then((result) => {
            console.log(result);
            // success delete
            if (result) {
                shelves.findByPk(id)
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

// Shelves Count
exports.shelves_count = (req, res) => {
    shelves
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

// Get all shelves of a room
exports.get_all_shelves_of_room = (req, res) => {
    shelves
        .findAll({ where: { roomID: req.params.roomID }})
        .then((data) => dataResponse(res, data, 'Shelves of that room has been retrieved', 'No shelf of that room has been retrieved'))
        .catch((err) => errResponse(res, err))
}