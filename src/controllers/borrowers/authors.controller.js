const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const authors= db.authors;

// Retrieve all authors
exports.view_all_authors = (req, res) => {
    authors.findAll({
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
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};