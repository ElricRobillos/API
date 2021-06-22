const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;

// Add new material
exports.add_material = async (req, res) => {
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

        materials.create(req.body, {
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
            materials
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
                            as: 'shelf',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt',
                                    'roomID'
                                ]
                            }
                        },
                        {
                            model: db.authors,
                            as: 'authors',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt',
                                    'materialID'
                                ]
                            }
                        },
                        {
                            model: db.genres,
                            as: 'genres',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt',
                                    'materialID'
                                ]
                            }
                        },
                        {
                            model: db.languages,
                            as: 'language',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
                        },
                        {
                            model: db.material_types,
                            as: 'material_type',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
                        },
                        {
                            model: db.publishers,
                            as: 'publisher',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
                        },
                        {
                            model: db.publication_countries,
                            as: 'publication_country',
                            attributes:{
                                exclude: [
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
                        },
                    ]
                })
                .then((data) => dataResponse(res, data, 'A material is added successfully!', 'Failed to add material'))
                .catch((err) => errResponse(res, err));
        })
        .catch((err) => errResponse(res, err));
    }
};

// Retrieve all materials
exports.view_all_materials = (req, res) => {
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
        include:[
            {
                model: db.shelves,
                as: 'shelf',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'roomID'
                    ]
                }
            },
            {
                model: db.authors,
                as: 'authors',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'materialID'
                    ]
                }
            },
            {
                model: db.genres,
                as: 'genres',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'materialID'
                    ]
                }
            },
            {
                model: db.languages,
                as: 'language',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.material_types,
                as: 'material_type',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.publishers,
                as: 'publisher',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.publication_countries,
                as: 'publication_country',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific material
exports.find_material = (req, res) => {
    const id = req.params.materialID; 

    materials.findByPk(id,{
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
        include:[
            {
                model: db.shelves,
                as: 'shelf',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'roomID'
                    ]
                }
            },
            {
                model: db.authors,
                as: 'authors',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'materialID'
                    ]
                }
            },
            {
                model: db.genres,
                as: 'genres',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
                        'materialID'
                    ]
                }
            },
            {
                model: db.languages,
                as: 'language',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.material_types,
                as: 'material_type',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.publishers,
                as: 'publisher',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            },
            {
                model: db.publication_countries,
                as: 'publication_country',
                attributes:{
                    exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt'
                    ]
                }
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Update material record
exports.update_material = async (req, res) => {
    const id = req.params.materialID;

    materials.update(req.body, {
        where:{ 
            materialID: id 
        },
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        materials.findByPk(id,{
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
            include:[
                {
                    model: db.shelves,
                    as: 'shelf',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'roomID'
                        ]
                    }
                },
                {
                    model: db.authors,
                    as: 'authors',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'materialID'
                        ]
                    }
                },
                {
                    model: db.genres,
                    as: 'genres',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'materialID'
                        ]
                    }
                },
                {
                    model: db.languages,
                    as: 'language',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.material_types,
                    as: 'material_type',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.publishers,
                    as: 'publisher',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.publication_countries,
                    as: 'publication_country',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
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

// Change status of material
exports.change_material_status = (req, res) => {
    const id = req.params.materialID;
    const body = { 
        status: "Inactive" 
    };
    
    materials.update(body, {
        where:{ 
            materialID: id 
        }
    })
    .then((result) => {
    console.log(result);
    if (result) {
        // success update
        materials.findByPk(id,{
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
            include:[
                {
                    model: db.shelves,
                    as: 'shelf',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'roomID'
                        ]
                    }
                },
                {
                    model: db.authors,
                    as: 'authors',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'materialID'
                        ]
                    }
                },
                {
                    model: db.genres,
                    as: 'genres',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'materialID'
                        ]
                    }
                },
                {
                    model: db.languages,
                    as: 'language',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.material_types,
                    as: 'material_type',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.publishers,
                    as: 'publisher',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
                },
                {
                    model: db.publication_countries,
                    as: 'publication_country',
                    attributes:{
                        exclude: [
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt'
                        ]
                    }
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

