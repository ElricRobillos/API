const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;

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