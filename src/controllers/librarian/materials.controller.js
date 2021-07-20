const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;

// Add new material
exports.add_material = async (req, res) => {

    // Get image name
    req.body.image = req.file != undefined ? req.file.filename : null;

    // Get authors
    var authors = [];
    authorIDs = req.body.authors;
    if(authorIDs) {
        if(Array.isArray(authorIDs)) {
            authorIDs.forEach(authorID => authors.push({ authorID: authorID}));
        } else if(Object.prototype.toString.call(authorIDs)) {
            authors.push({ authorID: authorIDs})
        }
    }

    // Get genres
    var genres = [];
    genreIDs = req.body.genres;
    if(genreIDs) {
        if(Array.isArray(genreIDs)) {
            genreIDs.forEach(genreID => genres.push({ genreID: genreID}));
        } else if(Object.prototype.toString.call(genreIDs)) {
            genres.push({ genreID: genreIDs})
        }
    }

    // Get userID for added/updated by
    req.body.added_by = req.user.userID;
    req.body.updated_by = req.user.userID;

    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    } else {
        materials
            .create(req.body)
            .then((result) => {
                authors.forEach(author => result.addAuthor(author.authorID));
                genres.forEach(genre => result.addGenre(genre.genreID));
                dataResponse(res, result, 'Material is successfully created', 'No material is created');
            })
            .catch((err) => errResponse(res, err));
    }
};

// Material options
const materialOp = {
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
            model: db.authors,
            as: 'authors',
        }, {
            model: db.genres,
            as: 'genres',
        }, {
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
            },
            include: [
                {
                    model: db.rooms,
                    as: 'room',
                    attributes:{
                        exclude: [
                            'status',
                            'addedBy',
                            'updatedBy',
                            'addedAt',
                            'updatedAt',
                            'roomID'
                        ]
                    },
                    include: [
                        {
                            model: db.buildings,
                            as: 'building',
                            attributes:{
                                exclude: [
                                    'status',
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt',
                                    'roomID'
                                ]
                            },
                            
                        }
                    ]
                }
            ],
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }, {
            model: db.copies,
            as: 'copies'
        }
    ]
}

// Retrieve all materials
exports.view_all_materials = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        materials
            .findAll(materialOp)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Find specific material
exports.find_material = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        materials
            .findByPk(req.params.materialID, materialOp)
            .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch((err) => errResponse(res, err));
    }
};

// Update material record
exports.update_material = async (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
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
                        model: db.author_material,
                        as: 'author_materials',
                        attributes:{
                            exclude:[
                                'materialID',
                                'authorID'
                            ]
                        },
                        include: [
                            {
                                model: db.authors,
                                as: 'authors',
                            }
                        ]
                    },
                    {
                        model: db.genre_material,
                        as: 'genre_materials',
                        attributes:{
                            exclude:[
                                'materialID',
                                'genreID'
                            ]
                        },
                        include: [
                            {
                                model: db.genres,
                                as: 'genres',
                            }
                        ]
                    },
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
                        },
                        include: [
                            {
                                model: db.rooms,
                                as: 'room',
                                attributes:{
                                    exclude: [
                                        'status',
                                        'addedBy',
                                        'updatedBy',
                                        'addedAt',
                                        'updatedAt',
                                        'roomID'
                                    ]
                                },
                                include: [
                                    {
                                        model: db.buildings,
                                        as: 'building',
                                        attributes:{
                                            exclude: [
                                                'status',
                                                'addedBy',
                                                'updatedBy',
                                                'addedAt',
                                                'updatedAt',
                                                'roomID'
                                            ]
                                        },
                                        
                                    }
                                ]
                            }
                        ],
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
    }
};

// Change status of material
exports.change_material_status = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
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
                        model: db.author_material,
                        as: 'author_materials',
                        attributes:{
                            exclude:[
                                'materialID',
                                'authorID'
                            ]
                        },
                        include: [
                            {
                                model: db.authors,
                                as: 'authors',
                            }
                        ]
                    },
                    {
                        model: db.genre_material,
                        as: 'genre_materials',
                        attributes:{
                            exclude:[
                                'materialID',
                                'genreID'
                            ]
                        },
                        include: [
                            {
                                model: db.genres,
                                as: 'genres',
                            }
                        ]
                    },
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
                        },
                        include: [
                            {
                                model: db.rooms,
                                as: 'room',
                                attributes:{
                                    exclude: [
                                        'status',
                                        'addedBy',
                                        'updatedBy',
                                        'addedAt',
                                        'updatedAt',
                                        'roomID'
                                    ]
                                },
                                include: [
                                    {
                                        model: db.buildings,
                                        as: 'building',
                                        attributes:{
                                            exclude: [
                                                'status',
                                                'addedBy',
                                                'updatedBy',
                                                'addedAt',
                                                'updatedAt',
                                                'roomID'
                                            ]
                                        },
                                        
                                    }
                                ]
                            }
                        ],
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
    }
};

// Material Types Count
exports.materials_count = (req, res) => {
    materials
        .count()
        .then((result) => res.send({ count: result }))
        .catch((err) => errResponse(res, err));
}