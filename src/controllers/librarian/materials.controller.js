const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;

// Create and Save a new author
exports.create_materials = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID

        for(var i in req.body.authors) {
            req.body.authors[i].addedBy = req.user.userID
            req.body.authors[i].updatedBy = req.user.userID
        }

        for(var i in req.body.genres) {
            req.body.genres[i].addedBy = req.user.userID
            req.body.genres[i].updatedBy = req.user.userID
        }

        db.materials.create(req.body, {
            include : [
                {
                    model: db.authors,
                    as: 'authors',
                },
                {
                    model: db.genres,
                    as: 'genres'
                }
            ]
        })
        .then((result) => {
            db.materials
                .findByPk(result.materialID,{
                    attributes:{
                        exclude:[
                            'shelfID',
                            'languageID',
                            'typeID',
                            'publisherID',
                            'pubCountryID'
                        ]
                    },
                    include:[
                        {
                            model: db.shelves,
                            as: 'shelf'
                        },
                        {
                            model: db.authors,
                            as: 'authors',
                        },
                        {
                            model: db.genres,
                            as: 'genres'
                        },
                        {
                            model: db.languages,
                            as: 'language'
                        },
                        {
                            model: db.material_types,
                            as: 'material_type'
                        },
                        {
                            model: db.publishers,
                            as: 'publisher'
                        },
                        {
                            model: db.publication_countries,
                            as: 'publication_country'
                        },
                    ]
                })
                .then((data) => dataResponse(res, data, 'A material is added successfully!', 'Failed to add material'))
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all materials from the database.
exports.findAll_materials = (req, res) => {
    materials.findAll({
        attributes:{
            exclude: [
                'shelfID',
                'languageID',
                'typeID',
                'publisherID',
                'pubCountryID',
                'authorID',
                'genreID'
            ]
        },
        where: { 
            status: "Active"
        },
        include : [
            {
                model: db.shelves,
                as: 'shelf'
            },
            {
                model: db.languages,
                as: 'language'
            },
            {
                model: db.material_types,
                as: 'material_type'
            },
            {
                model: db.publishers,
                as: 'publisher'
            },
            {
                model: db.publication_countries,
                as: 'publication_country'
            },
            {
                model: db.authors,
                as: 'authors'
            },
            {
                model: db.genres,
                as: 'genres'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find a single materials with an id
exports.findOne_materials = (req, res) => {
    const id = req.params.materialID; 

    materials.findByPk(id)
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update a materials by the id in the request
exports.update_materials = async (req, res) => {
    const id = req.params.materialID;

    materials.update(req.body, {
        where: { materialID: id },
    })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            materials.findByPk(id).then((data) => {
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

// Delete a materials with the specified id in the request
exports.delete_materials = (req, res) => {
    const id = req.params.materialID;
    const body = { status: "Inactive" };
        materials.update(body, {
            where: { materialID: id },
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success
            materials.findByPk(id).then((data) => {
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
        .catch((err) => errResponse(res, err));
};

