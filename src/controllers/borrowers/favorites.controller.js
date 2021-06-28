const {errResponse, dataResponse} = require("../../helpers/controller.helper")  
const db = require("../../models");
const favorites = db.favorites;

// Add favorite
exports.add_favorite = async (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        req.body.addedBy = req.user.userID

        req.body.updatedBy = req.user.userID
        
        favorites.create(req.body)
        .then((data) => dataResponse(res, data, 'A favorite is added successfully!', 'Failed to add favorite'))
        .catch((err)  => errResponse(res, err));
    }
};

// Retrieve all favorites
exports.view_all_favorites  = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        favorites.findAll({ 
            attributes:{
                exclude: [
                    'materialID'
                ]
            },
            where:{
                status: "Active" 
            },
            include:[
                {
                    model: db.materials,
                    as: 'material'
                }
            ]
        })
        .then((data) => dataResponse(res, data, process.env.SUCCESS_RETRIEVED, process.env.NO_DATA_RETRIEVED))
        .catch((err)  => errResponse(res, err));
    }
};

// Find specific favorite
exports.find_favorite = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.favoriteID; 

        favorites.findByPk(id,{
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
                    as: 'material'
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
        .catch((err)  => errResponse(res, err));
    }
};

// Update a favorites by the id in the request
exports.update_favorites  = async (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.favoriteID;

        favorites.update(req.body, {
            where:{ 
                favoriteID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            favorites.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.SUCCESS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in updating a record"],
            });
        }
        })
        .catch((err)  => errResponse(res, err));
    }

};

// Change status of favorite
exports.change_favorite_status  = (req, res) => {
    const authorizedUser = req.user.userType === 'Staff' || req.user.userType === 'Student';
    if(res.user == null && !authorizedUser){
        res.sendStatus(403);
    }
    else{
        const id = req.params.favoriteID;
        const body = { 
            status: "Inactive" 
        };

        favorites.update(body, {
            where:{ 
                favoriteID: id 
            }
        })
        .then((result) => {
        console.log(result);
        if (result) {
            // success update
            favorites.findByPk(id)
            .then((data) => {
                res.send({
                    error: false,
                    data: data,
                    message: [process.env.STATUS_UPDATE],
                });
            });
        } else {
            // error in updating
            res.status(500).send({
            error: true,
            data: [],
            message: ["Error in deleting a record"],
            });
        }
        })
        .catch((err)  => errResponse(res, err));
    }
};

