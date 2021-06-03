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

// Create and Save a new User
exports.create_users = async (req, res) => {
        req.body.password = await bcrypt.hash(
            req.body.password, 
            parseInt(process.env.SALT_ROUND)
        );
        
        db.users.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["A User is created successfully."],
            });
                
        })
        .catch((err) =>{
            res.status(500).send({
                error: true,
                data: [],
                message: err.errors.map((e) => e.message),
            });
        });
};

