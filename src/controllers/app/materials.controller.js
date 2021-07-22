const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const materials = db.materials;
const { Op } = require('sequelize');


// View All Available Materials
exports.view_all_available_materials = (req, res) => {
    const page = req.params.page;
    const limit = parseInt(process.env.FETCH_LIMIT);
    const offset = page > 1 ? (page - 1) * limit : 0; 
    
    materials
        .findAll({
            where: { status: 'Active' },
            include: [
                {
                    model: db.copies,
                    as: 'copies',
                    where: {
                        status: 'Available',
                        [Op.not]: { copyID: null }
                    }
                }, {
                    model: db.authors,
                    as: 'authors'
                }
            ],
            limit: limit,
            offset: offset
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


// Count all available materials
exports.available_materials_count = (req, res) => {
    materials
        .findAll({ 
            where: { status: "Active" },
            include: [{
                model: db.copies,
                as: 'copies',
                where: {
                    status: 'Available',
                    [Op.not]: { copyID: null }
                }
            }]
        })
        .then(data => dataResponse(res, data.length, 'Materials count retrieved successfully', 'No materials has been counted'))
        .catch(err => errResponse(res, err))
}


// Latest available materials
exports.latest_available_materials = (req, res) => {
    materials
        .findAll({
            where: { status: 'Active' },
            include: [
                {
                    model: db.copies,
                    as: 'copies',
                    where: {
                        status: 'Available',
                        [Op.not]: { copyID: null }
                    }
                }, {
                    model: db.authors,
                    as: 'authors'
                }
            ],
            order: [['addedAt', 'DESC']],
            limit: 4
        })
        .then(data => dataResponse(res, data, 'Latest Materials retrieved successfully', 'No material has been retrieved'))
        .catch(err => errResponse(res, err));
}
