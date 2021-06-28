const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const publishers = db.publishers;

// Retrieve all publishers
exports.view_all_publishers = (req, res) => {
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        publishers.findAll({
            where:{ 
                status: "Active" 
            },
            include:[
                {
                    model: db.materials,
                    as: 'material',
                    attributes:{
                        exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
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
                }
            ]
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};

// Find specific publisher
exports.find_publisher = (req, res) => {
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.publisherID; 

        publishers.findByPk(id,{
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
                    as: 'material',
                    attributes:{
                        exclude: [
                        'addedBy',
                        'updatedBy',
                        'addedAt',
                        'updatedAt',
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
                }
            ]
        })
        .then((data) => {
            res.send({
                error: false,
                data: data,
                message: [process.env.SUCCESS_RETRIEVED],
            });
        })
        .catch((err) => errResponse(res, err));
    }
}; 