const {errResponse, dataResponse} = require("../../helpers/controller.helper")    
const db = require("../../models");
const materials_borrow_records = db.materials_borrow_records;
const { Op } = require('sequelize');


// Material Borrow Records Options
dbMaterialsBorrowRecordsOp = {
    attributes:{
        exclude: [
            'copyID',
            'transactionID'
        ]
    },
    include:[
        {
            model: db.copies,
            as: 'copy',
            attributes: {
                exclude: [
                    'materialID'
                ]
            },
            include: [{
                model: db.materials,
                as: 'material',
                attributes: {
                    exclude: [
                        'materialID',
                        'languageID',
                        'typeID'
                    ]
                },
                include: [
                    {
                        model: db.material_types,
                        as: 'material_type'
                    }, {
                        model: db.languages,
                        as: 'language'
                    }
                ]
            }]
        },
        {
            model: db.transactions,
            as: 'transaction',
            attributes: {
                exclude: [
                    'userID',
                ]
            },
            include: [{
                model: db.users,
                as: 'transaction_borrower',
                attributes: {
                    exclude: [
                        'addedAt',
                        'addedBy',
                        'updatedAt',
                        'updatedBy',
                        'password',
                    ]
                }
            }]
        }
    ],
    order: [['createdAt', 'desc']]
}

// Retrieve all materials_borrow_records
exports.view_all_materials_borrow_records = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        materials_borrow_records.findAll(dbMaterialsBorrowRecordsOp)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Find specific materials_borrow_record
exports.find_materials_borrow_record = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.borrowID; 

        materials_borrow_records.findByPk(id,{
            attributes:{
                exclude: [
                    'copyID',
                    'transactionID'
                ]
            },
            include:[
                {
                    model: db.copies,
                    as: 'copy'
                },
                {
                    model: db.transactions,
                    as: 'transaction'
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

// Update materials_borrow_record
exports.update_materials_borrow_record = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian') {
        res.sendStatus(403);
    } else {
        const id = req.params.borrowID;

        materials_borrow_records
            .update(req.body, { where:{ borrowID: id }})
            .then((result) => {
                if (result) {
                    // success update
                    materials_borrow_records.findByPk(id,{
                        attributes:{
                            exclude: [
                                'copyID',
                                'transactionID'
                            ]
                        },
                        where:{ 
                            status: "Active" 
                        },
                        include:[
                            {
                                model: db.copies,
                                as: 'copy'
                            },
                            {
                                model: db.transactions,
                                as: 'transaction'
                            }
                        ]
                    })
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

// Change Borrow Status
exports.change_borrow_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian') {
        res.sendStatus(403);
    } else {
        const borrowID = req.params.borrowID;
        const borrowStatus =  req.body.status;

        materials_borrow_records
            .update({ status: borrowStatus }, { where: { borrowID: borrowID }})
            .then(result => {
                if(result) {
                    materials_borrow_records
                        .findByPk(borrowID, {
                            include: [{
                                model: db.copies,
                                as: 'copy'
                            }]
                        })
                        .then(result => {
                            if(borrowStatus == 'Returned') {
                                db.copies.update({
                                    status: 'Available' 
                                }, { 
                                    where: { copyID: result.copy.copyID }
                                });
                            } else if(borrowStatus == 'Weeded') {
                                db.copies.update({
                                    status: 'Weeded' 
                                }, { 
                                    where: { copyID: result.copy.copyID }
                                });
                            }
                        })
                        .catch(err => errResponse(res, err));
                    dataResponse(res, result, 'Successfully updated a borrow record', 'There was an error in updating borrow record')
                }
            })
            .catch(err => errResponse(res, err));
    }
}


// Material Borrowed Materials Option
dbBorrowedMaterialsOp = {
    where: {
        [Op.or]: [
            { status: 'Unreturned' },
            { status: 'Overdue' }
        ]
    },
    attributes:{
        exclude: [
            'copyID',
            'transactionID'
        ]
    },
    include:[
        {
            model: db.copies,
            as: 'copy',
            attributes: {
                exclude: [
                    'materialID'
                ]
            },
            include: [{
                model: db.materials,
                as: 'material',
                attributes: {
                    exclude: [
                        'materialID',
                        'languageID',
                        'typeID'
                    ]
                },
                include: [
                    {
                        model: db.material_types,
                        as: 'material_type'
                    }, {
                        model: db.languages,
                        as: 'language'
                    }
                ]
            }]
        },
        {
            model: db.transactions,
            as: 'transaction',
            attributes: {
                exclude: [
                    'userID',
                ]
            },
            include: [{
                model: db.users,
                as: 'transaction_borrower',
                attributes: {
                    exclude: [
                        'addedAt',
                        'addedBy',
                        'updatedAt',
                        'updatedBy',
                        'password',
                    ]
                }
            }]
        }
    ],
    order: [['createdAt', 'desc']]
}

// Retrieve all borrowed materials
exports.view_all_borrowed_materials = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        materials_borrow_records.findAll(dbBorrowedMaterialsOp)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};


// Material Borrowed Materials Option
dbReturnedMaterialsOp = {
    where: {
        status: 'Returned',
    },
    attributes:{
        exclude: [
            'copyID',
            'transactionID'
        ]
    },
    include:[
        {
            model: db.copies,
            as: 'copy',
            attributes: {
                exclude: [
                    'materialID'
                ]
            },
            include: [{
                model: db.materials,
                as: 'material',
                attributes: {
                    exclude: [
                        'materialID',
                        'languageID',
                        'typeID'
                    ]
                },
                include: [
                    {
                        model: db.material_types,
                        as: 'material_type'
                    }, {
                        model: db.languages,
                        as: 'language'
                    }
                ]
            }]
        },
        {
            model: db.transactions,
            as: 'transaction',
            attributes: {
                exclude: [
                    'userID',
                ]
            },
            include: [{
                model: db.users,
                as: 'transaction_borrower',
                attributes: {
                    exclude: [
                        'addedAt',
                        'addedBy',
                        'updatedAt',
                        'updatedBy',
                        'password',
                    ]
                }
            }]
        }
    ],
    order: [['createdAt', 'desc']]
}

// Retrieve all borrowed materials
exports.view_all_returned_materials = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        materials_borrow_records.findAll(dbReturnedMaterialsOp)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Material Borrow Records Count
exports.material_borrow_records_count = (req, res) => {
    materials_borrow_records
        .count()
        .then(result => res.send({ count: result }))
        .catch(err => errResponse(res, err));
}