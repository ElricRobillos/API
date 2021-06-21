const {errResponse, dataResponse} = require("../../helpers/controller.helper")    
const db = require("../../models");
const materials_borrow_records = db.materials_borrow_records;

// Add new materials_borrow_record
exports.add_materials_borrow_record = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        materials_borrow_records.create(req.body)
        .then((data) => dataResponse(res, data, 'A Materials Borrow Record is added successfully!','Failed to add a Materials Borrow Record'))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all materials_borrow_records
exports.view_all_materials_borrow_records = (req, res) => {
    materials_borrow_records.findAll({
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
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find specific materials_borrow_record
exports.find_materials_borrow_record = (req, res) => {
    const id = req.params.borrowID; 

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
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err)  => errResponse(res, err));
};

// Update materials_borrow_record
exports.update_materials_borrow_record = async (req, res) => {
    const id = req.params.borrowID;

    materials_borrow_records.update(req.body, {
        where:{ 
            borrowID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        materials_borrow_records.findByPk(id)
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

