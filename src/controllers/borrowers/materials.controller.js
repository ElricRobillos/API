const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;

// Retrieve all materials
exports.view_all_materials = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        materials.findAll({
            where: { 
                status: "Active"
            },
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
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific material
exports.find_material = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.materialID; 

        materials.findByPk(id,{
            where: { 
                status: "Active"
            },
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
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};