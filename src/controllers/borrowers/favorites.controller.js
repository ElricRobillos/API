const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const favorites = db.favorites;


// Add favorite
exports.add_favorite = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {
        req.body.borrowerID = req.user.userID;
        favorites
            .create(req.body)
            .then(data => dataResponse(res, data, 'A favorite is added successfully!', 'Failed to add favorite'))
            .catch(err  => errResponse(res, err));
    }
};


// Retrieve all favorites
exports.view_all_favorites  = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser) {
        res.sendStatus(403);
    } else {
        favorites
            .findAll({ 
                where: { borrowerID: req.user.userID },
                include:[{
                    model: db.materials,
                    as: 'favorite_material',
                    include: [{
                        model: db.authors,
                        as: 'authors'
                    }]
                }]
            })
            .then(data => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
            .catch(err => errResponse(res, err));
    }
};


// Remove as favorite
exports.remove_as_favorite = (req, res) => {
    favorites
        .destroy({ where: { 
            materialID: req.body.materialID,
            borrowerID: req.user.userID
        }})
        .then(data => dataResponse(res, data, 'A favorite material has been removed'))
        .catch(err => errResponse(res, err));
}

// Favorites counts
exports.favorites_count = (req, res) => {
    favorites
        .count({
            where: {
                borrowerID: req.user.userID
            }
        })
        .then(data => dataResponse(res, data, 'Favorites count is successfully retrieved', 'No favorites count'))
        .catch(err => errResponse(res, err))
}