const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const author_material= db.genre_material;

// Find all materials of genre
exports.view_genre_materials = (req, res) => {
    if (req.user == null || req.user.userType != 'Librarian'){
        res.sendStatus(403);
    }
    else{
        const id = req.params.genreMaterialID; 

        genre_material.findByPk(id,{
            where: { 
                status: "Active"
            },
            attributes:{
                exclude:[
                    'materialID',
                    'genreID'
                ]
            },
            include: [
                {
                    model: db.materials,
                    as: "materials",
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
                                exclude: [
                                    'materialID',
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
                        },
                        {
                            model: db.genre_material,
                            as: 'genre_materials',
                            attributes:{
                                exclude: [
                                    'materialID',
                                    'addedBy',
                                    'updatedBy',
                                    'addedAt',
                                    'updatedAt'
                                ]
                            }
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
                }
            ],
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err) => errResponse(res, err));
    }
};