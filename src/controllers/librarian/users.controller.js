const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const bcrypt = require("bcrypt");
//const datatable = require(`sequelize-datatables`);

// Create borrower
exports.create_users = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.added_by = req.user.userID

        req.body.updated_by = req.user.userID

        req.body.password = await bcrypt.hash(
            req.body.password, 
            parseInt(process.env.SALT_ROUND)
        );
        
        db.users.create(req.body)
        .then((data) => dataResponse(res, data, 'A user is added successfully!', 'Failed to add user'))
        .catch((err) => errResponse(res, err));
    }

};


//Retrieve all User from the database.
exports.findAll_users = (req, res) => {
    db.users.findAll({ 
        where: { status: "Active" },
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// // Find a single User with an id
// exports.findOne = (req, res) => { 
//     const id = req.params.userID;

//     users.findByPk(id)
//     .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
//     .catch((err) => errResponse(res, err));
// };

// // Update a User by the id in the request
// exports.update = async (req, res) => {
//     const id = req.params.userID

//     if (req.body.password) {
//         req.body.password = await bcrypt.hash(
//         req.body.password,
//         parseInt(process.env.SALT_ROUNDS)
//         );
//     }

//     users.update(req.body, {
//         where: { userID: id },
//     })
//         .then((result) => {
//         if (result) {
//             // success
//             users.findByPk(id).then((data) => {
//             res.send({
//                 error: false,
//                 data: data,
//                 message: [process.env.SUCCESS_UPDATE],
//             });
//             });
//         } else {
//             // error in updating
//             res.status(500).send({
//             error: true,
//             data: [],
//             message: [process.env.SUCCESS_UPDATE],
//             });
//         }
//         })
//         .catch((err) => errResponse(res, err));
// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => { 
//         // delete
//     const id = req.params.userID;
//     const body = { status: "Inactive" };

//     users.update(body, {
//         where: { userID: id },
//     })
//         .then((result) => {
//         if (result) {
//             // success
//             users.findByPk(id).then((data) => {
//             res.send({
//                 error: false,
//                 data: data,
//                 message: [process.env.SUCCESS_UPDATE],
//             });
//             });
//         } else {
//             // error in deleting
//             res.status(500).send({
//             error: true,
//             data: [],
//             message: ["Error in deleting a record"],
//             });
//         }
//         })
//         .catch((err) => errResponse(res, err));
// };

