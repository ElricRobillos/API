const db = require("../models");
const bcrypt = require("bcrypt");

// create user

exports.create = async (req, res) => {
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
    }

};