const db = require("../../models");
const bcrypt = require("bcrypt");
// const datatable = require(`sequelize-datatables`);

// exports.findDataTable = (req, res) => { 
//     req.body = {
//     draw: "1",
//     columns: [
//         {
//         data: "fullName",
//         name: "",
//         searchable: "true",
//         orderable: "true",
//         search: {
//             value: "",
//             regex: "false",
//         },
//         },
//     ],
//     order: [
//         {
//         column: "0",
//         dir: "asc",
//         },
//     ],
//     start: "0",
//     length: "10",
//     search: {
//         value: "",
//         regex: "false",
//     },
//     _: "1478912938246",
//     };

//     datatable(users, req.body).then((result) => { 
//     // result is response for datatables
//     res.json(result);
//     });
// };


// // Retrieve all User from the database.
// exports.findAll = (req, res) => {
//     users.findAll({ 
//         where: { status: "Active" },
//     })
//     .then((data) => {
//     res.send({
//         error: false,
//         data: data,
//         message: ["Retrieved successfully."],
//     });
//     })
//     .catch((err) => {
//     res.status(500).send({
//         error: true,
//         data: [],
//         message: err.errors.map((e) => e.message),
//     });
//     });

// };

// // Find a single User with an id
// exports.findOne = (req, res) => { 
//     const id = req.params.userID;

//     users.findByPk(id).then((data) => {
//         res.send({
//             error: false,
//             data: data,
//             message: [process.env.SUCCESS_RETRIEVED],
//         });
//     })
//     .catch((err) => {
//         res.status(500).send({
//         error: true,
//         data: [],
//         message:
//         err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
//         });
//     });

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
//         .catch((err) => {
//             res.status(500).send({
//                 error: true,
//                 data: [],
//                 message:
//                 err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
//             });
//     });

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
//         .catch((err) => {
//         res.status(500).send({
//             error: true,
//             data: [],
//             message:
//             err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
//         });
//     });


// };

