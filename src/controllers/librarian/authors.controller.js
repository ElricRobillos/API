const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const authors= db.authors;

// Add new author
exports.add_authors = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        authors.create(req.body)
        .then((data) => dataResponse(res, data, 'An author is added succesfully!', 'Failed to add author'))
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all authors
exports.view_all_authors = (req, res) => {
    authors.findAll({
        attributes:{
            exclude: [
                'materialID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.materials,
                as: 'material'
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific author
exports.find_author = (req, res) => {
    const id = req.params.authorID; 
    
    authors.findByPk(id,{
        attributes:{
            exclude:[
                'materialID'
            ]
        },
        where:{ 
            status: "Active" 
        },
        include:[
            {
                model: db.materials,
                as: 'material'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update an author record
exports.update_author = async (req, res) => {
    const id = req.params.authorID;

    authors.update(req.body, {
        where:{ 
            authorID: id 
        }
    })
    .then((result) => {
        console.log(result);
        if (result) {
            // success update
            authors.findByPk(id,{
                attributes:{
                    exclude:[
                        'materialID'
                    ]
                },
                include:[
                    {
                        model: db.materials,
                        as: 'material'
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
    .catch((err) => errResponse(res, err));
};


// Change status of author
exports.change_author_status = (req, res) => {
    const id = req.params.authorID;
    const body = {
        status: "Inactive"
    };

    authors.update(body, {
        where:{ 
            authorID: id 
        }
    })
    .then((result) => {
        console.log(result);
        if (result) {
            // success update
            authors.findByPk(id,{
                attributes:{
                    exclude:[
                        'materialID'
                    ]
                },
                include:[
                    {
                        model: db.materials,
                        as: 'material'
                    }
                ]
            })
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.STATUS_UPDATE],
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
    .catch((err) => errResponse(res, err));
};

