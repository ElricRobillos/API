const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;
const { Op } = require('sequelize');


// View All Available Materials
exports.view_all_available_materials = (req, res) => {
    materials
        .findAll({
            include: [
                {
                    model: db.copies,
                    as: 'copies',
                    where: {
                        [Op.not]: { copyID: null }
                    }
                }, {
                    model: db.authors,
                    as: 'authors'
                }
            ]
        })
        .then(data => dataResponse(res, data, 'Materials are retrieved successfully', 'No material has been retrieved'))
        .catch(err => errResponse(res, err));
}


// Get One Available Materials
exports.get_one_available_material = (req, res) => {
    materials
        .findByPk(req.params.materialID, {
            where: { status: "Active" },
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

                // Authors
                {
                    model: db.authors,
                    as: 'authors',
                }, 
                
                // Genres
                {
                    model: db.genres,
                    as: 'genres',
                }, 
                
                // Shelves
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
                
                // Languages
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
                
                // Material Types
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
                
                // Publishers
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
                
                // Publication Countries
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
        .then(data => dataResponse(res, data, 'Materials are retrieved successfully', 'No material has been retrieved'))
        .catch(err => errResponse(res, err));
}
