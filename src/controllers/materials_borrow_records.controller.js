const db = require("../models");
const materials_borrow_records = db.materials_borrow_records;


// Create and Save a weeding
exports.create = async (req, res) => {
    materials_borrow_records.create(req.body).then((data) => {
        res.send({
            error: false,
            data: data,
            message: ["A Weeding is created successfully."],
        });
    })
    .catch((err) =>{
        res.status(500).send({
            error: true,
            data: [],
            message: err.errors.map((e) => e.message),
        });
    })
    
};

// Retrieve all weeding from the database.
exports.findAll = (req, res) => {
    materials_borrow_records.findAll()
    .then((data) => {
    res.send({
        error: false,
        data: data,
        message: ["Retrieved successfully."],
    });
    })
    .catch((err) => {
    res.status(500).send({
        error: true,
        data: [],
        message: err.errors.map((e) => e.message),
    });
    });
};

// Find a single weeding with an id
exports.findOne = (req, res) => {
    const id = req.params.id; 

    materials_borrow_records.findByPk(id).then((data) => {
        res.send({
            error: false,
            data: data,
            message: [process.env.SUCCESS_RETRIEVED],
        });
    })
    .catch((err) => {
        res.status(500).send({
        error: true,
        data: [],
        message:
        err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
    });
    
};

// Update a weeding by the id in the request
exports.update = async (req, res) => {
    // const id = req.params.id;

//     weedings.update(req.body, {
//         where: { id: id },
//     })
//         .then((result) => {
//         console.log(result);
//         if (result) {
//             // success
//             weedings.findByPk(id).then((data) => {
//                 res.send({
//                     error: false,
//                     data: data,
//                     message: [process.env.SUCCESS_UPDATE],
//                 });
//             });
//         } else {
  
// // error in updating
//             res.status(500).send({
//             error: true,
//             data: [],
//             message: ["Error in updating a record"],
//             });
//         }
//         })
//         .catch((err) => {
//         res.status(500).send({
//             error: true,
//             data: [],
//             message:
//             err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
//         });
//         });
};

// Delete a weeding with the specified id in the request
exports.delete = (req, res) => {
    
};
