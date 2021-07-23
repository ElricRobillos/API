const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const weedings = db.weedings;

// Retrieve all weedings
exports.view_all_weedings = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        weedings.findAll({ 
            attributes:{
                exclude: [
                    'copyID'
                ]
            },
            include:[
                {
                    model: db.copies,
                    as: 'copy',
                    include: [
                        {
                            model: db.materials,
                            as: 'material'
                        }
                    ]

                }
            ]
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Find specific weeding
exports.find_weeding = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.weedID; 

        weedings.findByPk(id,{
            attributes:{
                exclude: [
                    'copyID'
                ]
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
    }
};

// Update weeding record
exports.update_weeding = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
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
    }
};

// Deleting Weedings record
exports.delete_weeding = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.weedingID;

        weedings.destroy({
            where:{ 
                weedingID: id 
            }
        })
        .then((result) => {
            console.log(result);
            // success delete
            if (result) {
                copweedingsies.findByPk(id)
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

// Add Weeding Record
exports.add_weeding_record = (req, res) => {
    
    req.body.addedBy = req.user.userID;
    req.body.updatedBy = req.user.userID;
    
    weedings
        .create(req.body)
        .then(result => {
            if(result) {
                db.materials_borrow_records
                    .findByPk(req.params.borrowID, {
                        include: [{
                            model: db.copies,
                            as: 'copy'
                        }]
                    })
                    .then(result2 => {
                        if(result2) {
                            db.materials_borrow_records
                                .update({
                                    status: 'Returned'
                                },{
                                    where: {
                                        borrowID: req.params.borrowID
                                    }
                                })
                            db.copies
                                .update({ 
                                    weedID: result.weedID, 
                                    status: 'Weeded' 
                                },{ 
                                    where: { 
                                        copyID: result2.copy.copyID 
                                    }
                                })
                                .then(data => dataResponse(res, data, 'A copy has been returned and weeded'))
                        }
                    })
                    .catch(err => errResponse(res, err))
            }
        })
        .catch(err => errResponse(res, err))
}

// Genres Count
exports.weedings_count = (req, res) => {
    weedings
        .count()
        .then(data => dataResponse(res, data, 'A copy has been returned and weeded'))
        .catch(err => errResponse(res, err))
}