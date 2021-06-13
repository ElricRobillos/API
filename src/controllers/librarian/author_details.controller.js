const db = require("../../models");
const author_details = db.author_details;

// Create and Save a new author detail
exports.create_author_details = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        db.author_details.create(req.body)
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: ["An author details are added successfully."],
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

// Retrieve all author details from the database.
exports.findAll_author_details = (req, res) => {
    author_details.findAll({ where: { status: "Active"}})
    .then((data) => {
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
        message: err.errors.map((e) => e.message),
    });
    });
};

// Find a single author details with an id
exports.findOne_author_details = (req, res) => {
    const id = req.params.authorDetailsID; 

    author_details.findByPk(id).then((data) => {
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

// Update an author details by the id in the request
exports.update_author_details = async (req, res) => {
    const id = req.params.authorDetailsID;

    author_details.update(req.body, {
        where: { authorDetailsID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            author_details.findByPk(id).then((data) => {
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
        .catch((err) => {
        res.status(500).send({
            error: true,
            data: [],
            message:
            err.errors.map((e) => e.message) || process.env.GENERAL_ERROR_MSG,
        });
        });
};

// Delete an author details with the specified id in the request
exports.delete_author_details = (req, res) => {
    const id = req.params.authorDetailsID;

    const body = { status: "Inactive" };
    
        author_details.update(body, {
            where: { authorDetailsID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            author_details.findByPk(id).then((data) => {
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
            message: ["Error in deleting a record"],
            });
        }
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