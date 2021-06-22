const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const material_types = db.material_types;

// Retrieve all material_types
exports.view_all_material_types = (req, res) => {
    material_types.findAll({ 
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
                        'pubCountryID',
                        'authorID',
                        'genreID'
                    ]
                },
                include : [
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
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific material_type
exports.find_material_type = (req, res) => {
    const id = req.params.typeID; 

    material_types.findByPk(id,{
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
                        'pubCountryID',
                        'authorID',
                        'genreID'
                    ]
                },
                include : [
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
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};