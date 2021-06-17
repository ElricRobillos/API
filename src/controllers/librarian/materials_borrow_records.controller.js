const {errResponse, dataResponse} = require("../../helpers/controller.helper")    
const db = require("../../models");
const materials_borrow_records = db.materials_borrow_records;

// Create and Save a new author
exports.create_materials_borrow_records = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.materials_borrow_records.create(req.body)
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
  };

// Retrieve all materials_borrow_records from the database.
exports.findAll_materials_borrow_records = (req, res) => {
    materials_borrow_records.findAll()
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};

// Find a single materials_borrow_records with an id
exports.findOne_materials_borrow_records = (req, res) => {
    const id = req.params.borrowID; 

    materials_borrow_records.findByPk(id)
    .then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err)  => errResponse(res, err));
};

// Update a materials_borrow_records by the id in the request
exports.update_materials_borrow_records = async (req, res) => {
    const id = req.params.borrowID;

    materials_borrow_records.update(req.body, {
        where: { borrowID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            materials_borrow_records.findByPk(id).then((data) => {
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

