const {errResponse, dataResponse} = require("../../helpers/controller.helper")    
const db = require("../../models");
const materials_borrow_records = db.materials_borrow_records;

// Retrieve all materials_borrow_records
exports.view_all_materials_borrow_records = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        materials_borrow_records.findAll({
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
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
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

