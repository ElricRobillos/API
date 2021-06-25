const {errResponse, dataResponse} = require("../../helpers/controller.helper")
const db = require("../../models");
const genres = db.genres;

// Retrieve all genres
exports.view_all_genres = (req, res) => {
    genres.findAll({
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
                model: db.genre_material,
                as: 'genre_materials'
            }
        ] 
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err) => errResponse(res, err));
};

// Find specific genre
exports.find_genre = (req, res) => {
    const id = req.params.genreID;

    genres.findByPk(id,{
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
                model: db.genre_material,
                as: 'genre_materials'
            }
        ]
    })
    .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
    .catch((err)  => errResponse(res, err));
};
